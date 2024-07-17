SELECT
    ai.shortname,
    ai.systemnumber,
    si.name,
    si.countrycode,
    si.env,
    COALESCE(am.active, 0) AS active
FROM
    asset_info ai
JOIN
    site_info si ON ai.siteid = si.siteid
LEFT JOIN
    (SELECT assetid, active
     FROM mapping_table
     WHERE autoid = 1) am ON ai.assetid = am.assetid
WHERE
    ai.siteid IN (SELECT siteid FROM sitegroup_info)
    AND ai.assettypeid = 'Generator';
