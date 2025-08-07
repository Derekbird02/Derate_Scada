SELECT
  ROUND(
    PERCENTILE_CONT(0.9) WITHIN GROUP (
      ORDER BY 
        CASE 
          WHEN notification_sent_by IS NOT NULL THEN EXTRACT(EPOCH FROM (notification_sent_time - created_time))
          ELSE EXTRACT(EPOCH FROM (close_time - created_time))
        END
    ) / 60.0, 2
  ) AS p90_minutes
FROM your_table
WHERE created_time >= '2025-01-01';