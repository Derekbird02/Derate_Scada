SELECT
  PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY 
    CASE 
      WHEN notification_sent_by IS NOT NULL THEN EXTRACT(EPOCH FROM (notification_sent_time - created_time))
      ELSE EXTRACT(EPOCH FROM (close_time - created_time))
    END
  ) AS p90_seconds
FROM your_table;