import psycopg2
from psycopg2.extras import execute_values

# Connection configs
SOURCE_DB = {
    "host": "source_host",
    "dbname": "source_db",
    "user": "source_user",
    "password": "source_pass",
    "port": 5432
}

TARGET_DB = {
    "host": "target_host",
    "dbname": "target_db",
    "user": "target_user",
    "password": "target_pass",
    "port": 5432
}

# Time range
START_TS = "2025-08-28 00:00:00"
END_TS   = "2025-08-28 18:00:00"

def transfer_data():
    try:
        # Connect to source and target
        src_conn = psycopg2.connect(**SOURCE_DB)
        tgt_conn = psycopg2.connect(**TARGET_DB)

        src_cur = src_conn.cursor()
        tgt_cur = tgt_conn.cursor()

        # 1. Fetch data from source
        src_cur.execute("""
            SELECT assetid, blocktimestamp, env, value
            FROM signals_info
            WHERE blocktimestamp >= %s AND blocktimestamp < %s
        """, (START_TS, END_TS))

        rows = src_cur.fetchall()

        if not rows:
            print("No rows found in source.")
            return

        # 2. Insert into target with UPSERT
        insert_sql = """
            INSERT INTO signals_info (assetid, blocktimestamp, env, value)
            VALUES %s
            ON CONFLICT ON CONSTRAINT signals_constraint
            DO UPDATE SET value = EXCLUDED.value;
        """

        execute_values(tgt_cur, insert_sql, rows, page_size=1000)
        tgt_conn.commit()

        print(f"Transferred {len(rows)} rows successfully.")

    except Exception as e:
        print("Error:", e)

    finally:
        if src_cur: src_cur.close()
        if tgt_cur: tgt_cur.close()
        if src_conn: src_conn.close()
        if tgt_conn: tgt_conn.close()

if __name__ == "__main__":
    transfer_data()
