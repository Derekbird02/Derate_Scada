import pandas as pd
import psycopg2
import psycopg2.extras
import config  # Assuming you have a config file with DB connection strings

def getFVData(gr_conn):
    sql_command = """
    SELECT park_name, system_number, device_name, variable_name, value_string, unit
    FROM old_table
    """
    
    # Read all data at once
    return pd.read_sql(sql_command, gr_conn)

def getNewTableData(roc_conn):
    sql_command = """
    SELECT park_name, device_name, variable_name
    FROM new_table
    """
    
    # Read all data from new_table
    return pd.read_sql(sql_command, roc_conn)

def GetForcedVariables():
    with psycopg2.connect(config.roc_connection_string_redshift) as conn:
        with psycopg2.connect(config.ls_desc_string_cnn) as roc:
            roc.autocommit = False  # Ensure atomicity

            # Fetch current data from both tables
            fd_old = getFVData(conn)  # Data from old_table
            fd_new = getNewTableData(roc)  # Data from new_table

            # Find rows that are in the new_table but not in the old_table
            missing_rows = fd_new[~fd_new.set_index(['park_name', 'device_name', 'variable_name'])
                                    .index.isin(fd_old.set_index(['park_name', 'device_name', 'variable_name']).index)]
            
            # Extract missing rows' primary keys for deletion
            missing_keys = missing_rows[['park_name', 'device_name', 'variable_name']].values.tolist()

            # Delete the missing rows from new_table
            if missing_keys:
                delete_query = """
                DELETE FROM new_table
                WHERE (park_name, device_name, variable_name) IN %s;
                """
                cursor = roc.cursor()
                cursor.execute(delete_query, (tuple(missing_keys),))

            # Now handle the upsert to insert/update rows from old_table into new_table
            upsert_query = """
            INSERT INTO new_table (park_name, system_number, device_name, variable_name, value_string, unit)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT ON CONSTRAINT unique_park_device_variable_value 
            DO UPDATE SET value_string = EXCLUDED.value_string, unit = EXCLUDED.unit;
            """
            
            # Convert the DataFrame to a list of tuples for batch processing
            tuples = [tuple(x) for x in fd_old.to_numpy()]

            # Execute the batch insert (upsert) using execute_batch
            psycopg2.extras.execute_batch(cursor, upsert_query, tuples, page_size=1000)

            # Commit after all changes (deletions and insertions/updates)
            roc.commit()

GetForcedVariables()
