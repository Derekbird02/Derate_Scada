WITH fault_cases AS (
  SELECT
    caseid,
    assetid,
    siteid,
    faultcode,
    start_time,
    end_time,
    LEAD(start_time) OVER (PARTITION BY assetid, faultcode ORDER BY start_time) AS next_start_time
  FROM cases
  WHERE faultcode = 11
),
time_diffs AS (
  SELECT
    assetid,
    faultcode,
    EXTRACT(EPOCH FROM (next_start_time - end_time)) / 3600.0 AS hours_between
  FROM fault_cases
  WHERE next_start_time IS NOT NULL
)
SELECT
  assetid,
  faultcode,
  ROUND(AVG(hours_between), 2) AS avg_hours_between_hours
FROM time_diffs
GROUP BY assetid, faultcode
ORDER BY assetid;
