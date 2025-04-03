import psycopg2

# Database Connection Configurations
OLD_DB_CONFIG = {
    "dbname": "old_db",
    "user": "old_user",
    "password": "old_password",
    "host": "old_host",
    "port": "5432"
}

NEW_DB_CONFIG = {
    "dbname": "new_db",
    "user": "new_user",
    "password": "new_password",
    "host": "new_host",
    "port": "5432"
}

def sync_tables():
    # Connect to both databases
    old_conn = psycopg2.connect(**OLD_DB_CONFIG)
    new_conn = psycopg2.connect(**NEW_DB_CONFIG)
    
    old_cur = old_conn.cursor()
    new_cur = new_conn.cursor()

    # Step 1: Fetch all rows from the old table
    old_cur.execute("SELECT park_name, device_name, variable_name, value_string, unit FROM old_table")
    old_data = old_cur.fetchall()

    # Step 2: Insert or update records in new table
    upsert_query = """
        INSERT INTO new_table (park_name, device_name, variable_name, value_string, unit)
        VALUES (%s, %s, %s, %s, %s)
        ON CONFLICT (park_name, device_name, variable_name) 
        DO UPDATE SET value_string = EXCLUDED.value_string, unit = EXCLUDED.unit;
    """
    
    new_cur.executemany(upsert_query, old_data)

    # Step 3: Delete rows that no longer exist in old_table
    delete_query = """
        DELETE FROM new_table
        WHERE (park_name, device_name, variable_name) NOT IN (
            SELECT park_name, device_name, variable_name FROM old_table
        );
    """
    
    new_cur.execute(delete_query)

    # Commit changes and close connections
    new_conn.commit()
    old_cur.close()
    new_cur.close()
    old_conn.close()
    new_conn.close()

if __name__ == "__main__":
    sync_tables()
