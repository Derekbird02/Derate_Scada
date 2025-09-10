
WITH weekly AS (
    SELECT
        responsiblealarm,
        DATE_TRUNC('week', createdtime) AS week_start,
        COUNT(*) FILTER (WHERE notification_sent = true) AS escalated,
        COUNT(*) AS total
    FROM cases
    WHERE createdtime >= NOW() - INTERVAL '8 weeks'
      AND responsiblealarm IN (101, 202, 303)
    GROUP BY responsiblealarm, DATE_TRUNC('week', createdtime)
),
percentages AS (
    SELECT
        responsiblealarm,
        week_start,
        ROUND(100.0 * escalated / NULLIF(total,0), 2) AS escalation_pct
    FROM weekly
)
SELECT
    TO_CHAR(week_start, 'YYYY-MM-DD') AS week_start,
    ROUND(AVG(escalation_pct), 2) AS avg_escalation_pct
FROM percentages
GROUP BY week_start
ORDER BY week_start ASC;   -- oldest (week 8) first
