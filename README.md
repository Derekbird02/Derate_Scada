SELECT 
    CASE 
        WHEN createdby IN ('jdoe', '2230421') THEN 'John Doe'
        WHEN createdby IN ('tommy', '36574781') THEN 'Tommy Lee'
        ELSE createdby
    END AS operator,
    SUM(CASE WHEN value = 'rescue' THEN 1 ELSE 0 END) AS Rescue,
    SUM(CASE WHEN value = 'bypass' THEN 1 ELSE 0 END) AS Bypass
FROM 
    actions
GROUP BY 
    CASE 
        WHEN createdby IN ('jdoe', '2230421') THEN 'John Doe'
        WHEN createdby IN ('tommy', '36574781') THEN 'Tommy Lee'
        ELSE createdby
    END
ORDER BY 
    Rescue DESC;
