WITH site_stats AS (
  SELECT
    ai.siteid,
    COUNT(*) AS total_assets,
    COUNT(*) FILTER (WHERE sil.quality <> 0) AS reporting_assets
  FROM assets ai
  INNER JOIN laststate sil ON ai.assetid = sil.assetid AND ai.env = sil.env
  GROUP BY ai.siteid
)

SELECT
  ai.name,
  am.assetid,
  am.message,
  CASE
    WHEN sil.quality = 0 THEN 'Netcom'
    ELSE 'Reporting'
  END AS "Current State",
  
  ss.reporting_assets::TEXT || ' / ' || ss.total_assets::TEXT AS "Site Average"

FROM mapping am
INNER JOIN assets ai ON am.assetid = ai.systemnumber
INNER JOIN laststate sil ON ai.assetid = sil.assetid AND ai.env = sil.env
LEFT JOIN site_stats ss ON ai.siteid = ss.siteid
WHERE am.id = 12
  AND am.active = 1;
