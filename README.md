WITH midnight_status AS (
    SELECT 
        s.assetid,
        CASE 
            WHEN s.quality = 3 AND s.ieccode IN (1, 2, 4, 13, 14, 15) THEN 'O'
            WHEN s.quality = 3 THEN 'S'
            ELSE 'S'
        END AS status
    FROM state_info s
    WHERE s.siteid = :siteid
      AND s.blocktimestamp = (
          -- Convert 'today midnight' in Central to Eastern (storage time)
          timezone('US/Eastern', timezone('US/Central', date_trunc('day', now())))
      )
),
case_counts AS (
    SELECT 
        c.assetid,
        COUNT(*) AS case_count
    FROM cases c
    WHERE c.siteid = :siteid
      AND c.type = 2
      AND c.insertdate >= now() - interval '24 hours'
    GROUP BY c.assetid
)
SELECT 
    m.assetid,
    m.status || '(' || COALESCE(cc.case_count, 0)::text || ')' AS status_with_cases
FROM midnight_status m
LEFT JOIN case_counts cc ON m.assetid = cc.assetid
ORDER BY m.assetid;
