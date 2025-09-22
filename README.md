select
   responsiblealarm,
  AVG(EXTRACT(EPOCH FROM (createdtime - notification_sent_time))) AS avg_escalation_delay_seconds
from
  cases
where
  and c.notification_sent
group by responsiblealarm;
