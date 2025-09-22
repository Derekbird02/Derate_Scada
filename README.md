SELECT
    responsiblealarm,
    TO_CHAR(AVG(notification_sent_time - createdtime), 'HH24:MI') AS avg_escalation_delay
FROM cases c
WHERE c.notification_sent
GROUP BY responsiblealarm;