SELECT 
    CASE 
        WHEN c.createdtime BETWEEN '2025-03-10 00:00:00' AND '2025-03-16 23:59:59' THEN 'Week 1'
        WHEN c.createdtime BETWEEN '2025-03-17 00:00:00' AND '2025-03-23 23:59:59' THEN 'Week 2'
        WHEN c.createdtime BETWEEN '2025-03-24 00:00:00' AND '2025-03-30 23:59:59' THEN 'Week 3'
        ELSE 'Other Weeks'
    END AS "Week Label",
    count(*) AS "Total Count",
    sum(CASE WHEN c.notification_sent_time IS NULL THEN 1 ELSE 0 END) AS "Count Resolved",
    sum(CASE WHEN c.notification_sent_time NOTNULL THEN 1 ELSE 0 END) AS "Count Escalated",
    ROUND((SUM(CASE WHEN c.notification_sent_time NOTNULL THEN 1 ELSE 0 END) * 1.0 / COUNT(*)) * 100, 2) AS "Escalation %",
    TO_CHAR(INTERVAL '1 second' * ROUND(AVG(CASE 
        WHEN c.notification_sent_time IS NULL THEN EXTRACT(EPOCH FROM (close_time - createdtime)) 
        ELSE NULL 
    END)), 'HH24:MI:SS') AS "Avg ROC RTS",
    TO_CHAR(INTERVAL '1 second' * ROUND(AVG(CASE 
        WHEN c.notification_sent_time NOTNULL THEN EXTRACT(EPOCH FROM (notification_sent_time - createdtime)) 
        ELSE NULL 
    END)), 'HH24:MI:SS') AS "Avg Escalate Time",
    TO_CHAR(INTERVAL '1 second' * ROUND(AVG(CASE 
        WHEN c.notification_sent_time NOTNULL THEN EXTRACT(EPOCH FROM (close_time - createdtime)) 
        ELSE NULL 
    END)), 'HH24:MI:SS') AS "Avg Site RTS"
FROM cases c
INNER JOIN asset_info ai ON ai.assetid = c.assetid
LEFT JOIN dnrlist_reference dr ON dr.model = ai.model AND dr.controller = ai.controllertype
WHERE 
    c.responsiblealarm IN ('63', '41', '335', '336', '1502', '1503', '1504', '1505', '1506', '1507', '1508', '1509', 
                           '1510', '1511', '1512', '1513', '1514', '1515', '1516', '1517', '1518', '1519', '1520', '1521')
    AND c.createdtime BETWEEN '2025-03-10 00:00:00' AND '2025-03-30 23:59:59'
    AND ai.controllertype NOT IN ('W', 'A')
    AND ai.platform = 'Cyp'
GROUP BY "Week Label"
ORDER BY MIN(c.createdtime);