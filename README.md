select si.siteid as "Site ID", si.name as "Site Name", max(sil.ts) as "Latest TS"
from state_info_last sil 
inner join site_info si on sil.siteid = si.siteid
inner join sitegroup_info si2 on sil.siteid = si2.siteid
where si2.sitegroupname not in ('EMEA_GE10', 'EMEA_GE9')
group by si.siteid, si.name having count(*) = SUM(case when sil.quality = 0 then 1 else 0 end) order by max(sil.ts) desc
