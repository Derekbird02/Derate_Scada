from psycopg2.extras import execute_values

# Only execute delete if there are missing rows
if missing_keys:
    delete_query = """
    DELETE FROM new_table
    USING (VALUES %s) AS tmp(park_name, device_name, variable_name)
    WHERE new_table.park_name = tmp.park_name
    AND new_table.device_name = tmp.device_name
    AND new_table.variable_name = tmp.variable_name;
    """
    execute_values(cursor, delete_query, missing_keys)