import pandas as pd
import psycopg2
import psycopg2.extras
import config  # Assuming you have a config file with DB connection strings

def getFVData(gr_conn, chunksize=10000):
    sql_command = """
    SELECT park_name, system_number, device_name, variable_name, value_string, unit
    FROM old_table
    """
    
    # Read in batches to avoid memory overload
    return pd.read_sql(sql_command, gr_conn, chunksize=chunksize)

def GetForcedVariables():
    with psycopg2.connect(config.roc_connection_string_redshift) as conn:
        with psycopg2.connect(config.ls_desc_string_cnn) as roc:
            roc.autocommit = False  # Ensure atomicity

            upsert_query = """
            INSERT INTO new_table (park_name, system_number, device_name, variable_name, value_string, unit)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (park_name, device_name, variable_name) 
            DO UPDATE SET value_string = EXCLUDED.value_string, unit = EXCLUDED.unit;
            """
            
            cursor = roc.cursor()

            # Fetch and process in chunks
            for chunk in getFVData(conn):
                tuples = [tuple(x) for x in chunk.to_numpy()]
                psycopg2.extras.execute_batch(cursor, upsert_query, tuples, page_size=1000)
            
            roc.commit()  # Commit only after all batches are inserted successfully

GetForcedVariables()
