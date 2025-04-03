delete_query = """
            DELETE FROM new_table
            WHERE (park_name, device_name, variable_name) NOT IN (
                SELECT park_name, device_name, variable_name
                FROM old_table
            );
            """
            cursor.execute(delete_query)
