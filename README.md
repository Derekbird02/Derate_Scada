def getFVData(gr_conn):
    sql_command = """
    Select
    park_name,
    system_number,
    device_name,
    variable_name,
    value_string,
    unit
    from tbwgr_t.pmt_xml_forced_variable
    """

    forcedata = pd.read_sql(sql_command, gr_conn)

    return forcedata


def GetForcedVariables():
    fd = pd.DataFrame()
    with psycopg2.connect(config.roc_connection_string_redshift) as conn:
        fd = getFVData(conn)


    with psycopg2.connect(config.ls_desc_string_cnn) as roc:
        roc.autocommit = True
        upsert_query = """
        INSERT INTO new_table (park_name, system_number, device_name, variable_name, value_string, unit)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON CONFLICT (park_name, device_name, variable_name) 
        DO UPDATE SET value_string = EXCLUDED.value_string, unit = EXCLUDED.unit;
        """
        tuples = [tuple(x) for x in fd.to_numpy()]
        cursor = roc.cursor()
        psycopg2.extras.execute_batch(cursor,upsert_query,tuples,page_size=1000)

GetForcedVariables()
