SELECT 
    EXTRACT(WEEK FROM createdtime) AS "Fiscal Week",
    ai.platform AS "Platform",
    COUNT(*) AS "Total Count",
    SUM(CASE WHEN c.notification_sent_time IS NULL THEN 1 ELSE 0 END) AS "Count Resolved",
    SUM(CASE WHEN c.notification_sent_time IS NOT NULL THEN 1 ELSE 0 END) AS "Count Escalated",
    ROUND((SUM(CASE WHEN c.notification_sent_time IS NOT NULL THEN 1 ELSE 0 END) * 1.0 / COUNT(*)) * 100, 2) AS "Escalation %",
    TO_CHAR(INTERVAL '1 second' * ROUND(AVG(CASE WHEN c.notification_sent_time IS NULL THEN EXTRACT(EPOCH FROM (close_time - createdtime)) ELSE NULL END)), 'HH24:MI:SS') AS "Avg ROC RTS",
    TO_CHAR(INTERVAL '1 second' * ROUND(AVG(CASE WHEN c.notification_sent_time IS NOT NULL THEN EXTRACT(EPOCH FROM (notification_sent_time - createdtime)) ELSE NULL END)), 'HH24:MI:SS') AS "Avg Escalate Time",
    TO_CHAR(INTERVAL '1 second' * ROUND(AVG(CASE WHEN c.notification_sent_time IS NOT NULL THEN EXTRACT(EPOCH FROM (close_time - createdtime)) ELSE NULL END)), 'HH24:MI:SS') AS "Avg Site RTS"
FROM cases c
INNER JOIN asset_info ai ON ai.assetid = c.assetid
LEFT JOIN dnrlist_reference dr ON dr.model = ai.model AND dr.controller = ai.controllertype
WHERE
    EXISTS (SELECT 1 FROM sitegroup_info si WHERE si.siteid = ai.siteid)
    AND c.responsiblealarm IN ('63', '41', '335', '336', '1502', '1503', '1504', '1505', '1506', '1507', '1508', '1509', '1510', '1511', '1512', '1513', '1514', '1515', '1516', '1517', '1518', '1519', '1520', '1521')
    AND createdtime >= DATE_TRUNC('week', CURRENT_DATE) -- Start from current fiscal week
    AND createdtime <= '2025-12-31 23:59:59' -- Adjust if fiscal year differs
    AND ai.controllertype NOT IN ('WdinSess', 'SOGAR')
    AND dr.newplat NOT IN ('1xB', '2xB', '1X')
GROUP BY EXTRACT(WEEK FROM createdtime), ai.platform
ORDER BY "Fiscal Week", ai.platform;