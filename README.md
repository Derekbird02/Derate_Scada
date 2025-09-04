tuples = [tuple(x) for x in a.to_numpy()]
            psycopg2.extras.execute_batch(cursor,insert_sql,tuples,page_size=1000)
