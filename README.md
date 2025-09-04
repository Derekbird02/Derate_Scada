Traceback (most recent call last):
  File "C:\ROC\Apps\escada3.0_MetricDataPulls\state_info.py", line 414, in <module>
    replicateState_Info(time_minutes)
  File "C:\ROC\Apps\escada3.0_MetricDataPulls\state_info.py", line 244, in replicateState_Info
    psycopg2.extras.execute_batch(cursor,insert_sql,tuples,page_size=1000)
  File "C:\Python\Python310\lib\site-packages\psycopg2\extras.py", line 1187, in execute_batch
    cur.execute(b";".join(sqls))
psycopg2.errors.NumericValueOutOfRange: integer out of range
