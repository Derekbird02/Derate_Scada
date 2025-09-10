WITH alarm_weeks AS (
    SELECT
        responsiblealarm,
        ROUND(100.0 * COUNT(*) FILTER (
                  WHERE notification_sent = true
                  AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '0 week')
              ) / NULLIF(COUNT(*) FILTER (
                  WHERE DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '0 week')
              ), 0), 2) AS week_0,
        ROUND(100.0 * COUNT(*) FILTER (
                  WHERE notification_sent = true
                  AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '1 week')
              ) / NULLIF(COUNT(*) FILTER (
                  WHERE DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '1 week')
              ), 0), 2) AS week_1,
        ROUND(100.0 * COUNT(*) FILTER (
                  WHERE notification_sent = true
                  AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '2 week')
              ) / NULLIF(COUNT(*) FILTER (
                  WHERE DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '2 week')
              ), 0), 2) AS week_2,
        ROUND(100.0 * COUNT(*) FILTER (
                  WHERE notification_sent = true
                  AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '3 week')
              ) / NULLIF(COUNT(*) FILTER (
                  WHERE DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '3 week')
              ), 0), 2) AS week_3,
        ROUND(100.0 * COUNT(*) FILTER (
                  WHERE notification_sent = true
                  AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '4 week')
              ) / NULLIF(COUNT(*) FILTER (
                  WHERE DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '4 week')
              ), 0), 2) AS week_4,
        ROUND(100.0 * COUNT(*) FILTER (
                  WHERE notification_sent = true
                  AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '5 week')
              ) / NULLIF(COUNT(*) FILTER (
                  WHERE DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '5 week')
              ), 0), 2) AS week_5,
        ROUND(100.0 * COUNT(*) FILTER (
                  WHERE notification_sent = true
                  AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '6 week')
              ) / NULLIF(COUNT(*) FILTER (
                  WHERE DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '6 week')
              ), 0), 2) AS week_6,
        ROUND(100.0 * COUNT(*) FILTER (
                  WHERE notification_sent = true
                  AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '7 week')
              ) / NULLIF(COUNT(*) FILTER (
                  WHERE DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '7 week')
              ), 0), 2) AS week_7
    FROM cases
    WHERE createdtime >= NOW() - INTERVAL '8 weeks'
      AND responsiblealarm IN (101, 202, 303)
    GROUP BY responsiblealarm
)
SELECT *
FROM alarm_weeks

UNION ALL

SELECT
    'Average' AS responsiblealarm,
    ROUND(AVG(week_0), 2),
    ROUND(AVG(week_1), 2),
    ROUND(AVG(week_2), 2),
    ROUND(AVG(week_3), 2),
    ROUND(AVG(week_4), 2),
    ROUND(AVG(week_5), 2),
    ROUND(AVG(week_6), 2),
    ROUND(AVG(week_7), 2)
FROM alarm_weeks
ORDER BY responsiblealarm;
