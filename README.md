SELECT DISTINCT ON (si.siteid) 
    si.siteid AS "Site ID",
    si.name AS "Site Name",
    sil.assetid AS "Asset ID",
    sil.ts AS "Latest TS"
FROM state_info_last sil
INNER JOIN site_info si ON sil.siteid = si.siteid
INNER JOIN sitegroup_info si2 ON sil.siteid = si2.siteid
WHERE si2.sitegroupname NOT IN ('EMEA_GE10', 'EMEA_GE9')
ORDER BY si.siteid, sil.ts DESC;