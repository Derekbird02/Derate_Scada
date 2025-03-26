select 
count(*) as "Total Count",
sum(case when c.notification_sent_time is null then 1 else 0 end) as "Count Resolved",
sum(case when c.notification_sent_time notnull then 1 else 0 end) as "Count Escalated",
round((sum(case when c.notification_sent_time notnull then 1 else 0 end)*1.0/count(*))*100,2) as "Escalation %",
to_char( interval '1 second' * round(avg(case when c.notification_sent_time is null then extract(epoch from (close_time - createdtime)) else null end)), 'HH24:MI:SS') as "Avg ROC RTS",
to_char( interval '1 second' * round(avg(case when c.notification_sent_time notnull then extract(epoch from (notification_sent_time - createdtime)) else null end)), 'HH24:MI:SS') as "Avg Escalate Time",
to_char( interval '1 second' * round(avg(case when c.notification_sent_time notnull then extract(epoch from (close_time - createdtime)) else null end)), 'HH24:MI:SS') as "Avg Site RTS"
from cases c
inner join asset_info ai on ai.assetid = c.assetid
left join dnrlist_reference dr on dr.model = ai.model and dr.controller = ai.controllertype
where
c.responsiblealarm in ('63', '41', '335', '336', '1502', '1503', '1504', '1505', '1506', '1507', '1508', '1509', '1510', '1511', '1512', '1513', '1514', '1515', '1516', '1517', '1518', '1519', '1520', '1521')
and c.createdtime between '2025-03-10 00:00:00' and '2025-03-16 00:00:00'
and ai.controllertype not in ('W', 'A')
and ai.platform = 'Cyp'
