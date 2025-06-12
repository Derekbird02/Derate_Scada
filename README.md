SELECT
  ai.name,
  am.assetid,
  am.message,
  CASE
    WHEN sil.quality = 0 THEN 'Netcom'
    ELSE 'Reporting'
  END AS "Current State",
  
  -- Reporting assets for the site
  COUNT(*) FILTER (WHERE sil.quality <> 0) OVER (PARTITION BY ai.siteid)::TEXT
  || ' / ' ||
  -- Total assets for the site
  COUNT(*) OVER (PARTITION BY ai.siteid)::TEXT AS "Site Average"

FROM
  mapping am
INNER JOIN assets ai ON
  am.assetid = ai.systemnumber
INNER JOIN laststate sil ON
  ai.assetid = sil.assetid AND ai.env = sil.env
WHERE
  am.id = 12
  AND am.active = 1;

