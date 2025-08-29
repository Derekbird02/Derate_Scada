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

        # 1. Get column names dynamically
        src_cur.execute("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'signals_info'
            ORDER BY ordinal_position
        """)
        cols = [row[0] for row in src_cur.fetchall()]
        col_names = ", ".join(cols)
        placeholders = ", ".join(["%s"] * len(cols))

        # 2. Fetch all data for given time range
        src_cur.execute(f"""
            SELECT {col_names}
            FROM signals_info
            WHERE blocktimestamp >= %s AND blocktimestamp < %s
        """, (START_TS, END_TS))
        rows = src_cur.fetchall()

        if not rows:
            print("No rows found in source.")
            return

        # 3. Build insert with DO NOTHING on conflict
        insert_sql = f"""
            INSERT INTO signals_info ({col_names})
            VALUES %s
            ON CONFLICT ON CONSTRAINT signals_constraint DO NOTHING;
        """

        execute_values(tgt_cur, insert_sql, rows, page_size=1000)
        tgt_conn.commit()

        print(f"Inserted {len(rows)} rows (skipped duplicates).")

    except Exception as e:
        print("Error:", e)

    finally:
        if src_cur: src_cur.close()
        if tgt_cur: tgt_cur.close()
        if src_conn: src_conn.close()
        if tgt_conn: tgt_conn.close()

if __name__ == "__main__":
    transfer_data()
