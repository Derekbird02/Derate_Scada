WITH weekly_cases AS (
    SELECT
        DATE_TRUNC('week', createdtime) AS week_start,
        responsiblealarm,  -- or sequence_name if that's your code
        COUNT(*) FILTER (WHERE notification_sent = true) AS escalated_cases,
        COUNT(*) AS total_cases
    FROM cases
    WHERE createdtime >= NOW() - INTERVAL '8 weeks'
    GROUP BY DATE_TRUNC('week', createdtime), responsiblealarm
)
SELECT
    week_start,
    responsiblealarm,
    escalated_cases,
    total_cases,
    ROUND((escalated_cases::decimal / NULLIF(total_cases, 0)) * 100, 2) AS escalation_percentage
FROM weekly_cases
ORDER BY week_start, responsiblealarm;
