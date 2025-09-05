WITH midnight_status AS (
    SELECT 
        s.assetid,
        s.ieccode,
        s.quality,
        CASE 
            WHEN s.quality = 3 AND s.ieccode IN (1, 2, 4, 13, 14, 15) THEN 'O'
            WHEN s.quality = 3 THEN 'S'
            ELSE 'S'
        END AS status,
        CASE 
            WHEN s.quality = 3 AND s.ieccode = 1  THEN 'Running'
            WHEN s.quality = 3 AND s.ieccode = 2  THEN 'Standby'
            WHEN s.quality = 3 AND s.ieccode = 4  THEN 'Startup'
            WHEN s.quality = 3 AND s.ieccode = 6  THEN 'Faulted'
            WHEN s.quality = 3 AND s.ieccode = 9  THEN 'Communication Fault'
            WHEN s.quality = 3 AND s.ieccode = 13 THEN 'Online'
            WHEN s.quality = 3 AND s.ieccode = 14 THEN 'Curtailment'
            WHEN s.quality = 3 AND s.ieccode = 15 THEN 'Normal Stop'
            ELSE 'Unknown'
        END AS status_text
    FROM state_info s
    WHERE s.siteid = :siteid
      AND s.blocktimestamp = (
          -- Convert Central midnight to Eastern (since blocktimestamp is stored Eastern)
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
),
fault_codes AS (
    SELECT DISTINCT ON (c.assetid) 
        c.assetid,
        c.responsiblealarm AS fault_code
    FROM cases c
    WHERE c.siteid = :siteid
      AND c.type = 2
      AND c.state = 1   -- open cases only
    ORDER BY c.assetid, c.insertdate DESC
)
SELECT 
    a.shortname,
    m.status || '(' || COALESCE(cc.case_count, 0)::text || ')' AS status_with_cases,
    m.status_text,
    CASE 
        WHEN m.quality = 3 AND m.ieccode IN (6, 9) THEN COALESCE(fc.fault_code, 'N/A')
        ELSE 'N/A'
    END AS fault_code
FROM midnight_status m
JOIN asset_info a ON a.assetid = m.assetid
LEFT JOIN case_counts cc ON m.assetid = cc.assetid
LEFT JOIN fault_codes fc ON m.assetid = fc.assetid
ORDER BY a.shortname;
