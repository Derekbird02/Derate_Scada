line 59, in GetForcedVariables
    cursor.execute(delete_query, (tuple(missing_keys),))
psycopg2.errors.UndefinedFunction: operator does not exist: record = text[]
LINE 3: ...    WHERE (park_name, device_name, variable_name) IN (ARRAY[...

HINT:  No operator matches the given name and argument types. You might need to add explicit type casts.
