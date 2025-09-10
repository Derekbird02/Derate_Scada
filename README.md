SELECT
    responsiblealarm,
    ROUND(100.0 * COUNT(*) FILTER (
              WHERE notification_sent = true
              AND notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '8 week')
          ) / NULLIF(COUNT(*) FILTER (
              WHERE notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '8 week')
          ), 0), 2) AS week_8,
    ROUND(100.0 * COUNT(*) FILTER (
              WHERE notification_sent = true
              AND notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '7 week')
          ) / NULLIF(COUNT(*) FILTER (
              WHERE notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '7 week')
          ), 0), 2) AS week_7,
    ROUND(100.0 * COUNT(*) FILTER (
              WHERE notification_sent = true
              AND notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '6 week')
          ) / NULLIF(COUNT(*) FILTER (
              WHERE notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '6 week')
          ), 0), 2) AS week_6,
    ROUND(100.0 * COUNT(*) FILTER (
              WHERE notification_sent = true
              AND notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '5 week')
          ) / NULLIF(COUNT(*) FILTER (
              WHERE notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '5 week')
          ), 0), 2) AS week_5,
    ROUND(100.0 * COUNT(*) FILTER (
              WHERE notification_sent = true
              AND notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '4 week')
          ) / NULLIF(COUNT(*) FILTER (
              WHERE notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '4 week')
          ), 0), 2) AS week_4,
    ROUND(100.0 * COUNT(*) FILTER (
              WHERE notification_sent = true
              AND notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '3 week')
          ) / NULLIF(COUNT(*) FILTER (
              WHERE notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '3 week')
          ), 0), 2) AS week_3,
    ROUND(100.0 * COUNT(*) FILTER (
              WHERE notification_sent = true
              AND notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '2 week')
          ) / NULLIF(COUNT(*) FILTER (
              WHERE notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '2 week')
          ), 0), 2) AS week_2,
    ROUND(100.0 * COUNT(*) FILTER (
              WHERE notification_sent = true
              AND notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '1 week')
          ) / NULLIF(COUNT(*) FILTER (
              WHERE notificationsentby = 'automation'
              AND DATE_TRUNC('week', createdtime) = DATE_TRUNC('week', NOW() - INTERVAL '1 week')
          ), 0), 2) AS week_1
FROM cases
WHERE createdtime >= NOW() - INTERVAL '8 weeks'
  AND notificationsentby = 'automation'
  -- AND responsiblealarm IN (101, 202, 303)  -- optional filter if you want specific alarms only
GROUP BY responsiblealarm
ORDER BY responsiblealarm;
