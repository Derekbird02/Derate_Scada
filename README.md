SELECT w.workflow_id,
       w.workflow_name,
       a.score
FROM workflows w
LEFT JOIN assessment a ON w.workflow_id = a.workflow_id
WHERE w.assetid IN ($Asset)
  AND (
    (
      -- When ALL colors are selected (Grafana expands $Score to all of them)
      ARRAY['red','amber','green'] <@ ARRAY[$Score]
      AND (a.score IN ('red','amber','green') OR a.score IS NULL)
    )
    OR (
      -- When NOT all colors are selected
      NOT (ARRAY['red','amber','green'] <@ ARRAY[$Score])
      AND a.score IN ($Score)
    )
  );
