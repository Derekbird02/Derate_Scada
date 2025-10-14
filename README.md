SELECT w.workflow_id,
       w.workflow_name,
       a.score
FROM workflows w
LEFT JOIN assessment a ON w.workflow_id = a.workflow_id
WHERE w.assetid IN ($Asset)
  AND (
    -- When "All" is selected
    ('All' = ANY(ARRAY[$Score]) AND (a.score IS NULL OR a.score IN ('red', 'green', 'amber')))

    -- When specific colors are selected
    OR (NOT 'All' = ANY(ARRAY[$Score]) AND a.score IN ($Score))
  )
