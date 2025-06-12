select
	ai.name,
	am.assetid,
	am.message,
	case
		when sil.quality = 0 then 'Netcom'
		else 'Reporting'
	end as "Current State"
from
	rocmetrics.automation_mapping am
inner join rocmetrics.asset_info ai on
	am.assetid = ai.systemnumber
inner join rocmetrics.state_info_last sil on
	ai.assetid = sil.assetid and ai.env = sil.env 
where
	am.idautomation = 199
	and am.active = 1
