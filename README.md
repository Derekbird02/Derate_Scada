SELECT 
    emcode,
    COUNT(*) AS case_count,  -- Number of cases per emcode
    FLOOR(AVG(EXTRACT(EPOCH FROM (endtime - starttime)) / 3600)) AS avg_duration_hours,
    FLOOR(MOD(AVG(EXTRACT(EPOCH FROM (endtime - starttime)) / 60)::numeric, 60)) AS avg_duration_minutes,
    FLOOR(MAX(EXTRACT(EPOCH FROM (endtime - starttime)) / 3600)) AS longest_duration_hours,
    FLOOR(MOD(MAX(EXTRACT(EPOCH FROM (endtime - starttime)) / 60)::numeric, 60)) AS longest_duration_minutes,
    FLOOR(MIN(EXTRACT(EPOCH FROM (endtime - starttime)) / 3600)) AS shortest_duration_hours,
    FLOOR(MOD(MIN(EXTRACT(EPOCH FROM (endtime - starttime)) / 60)::numeric, 60)) AS shortest_duration_minutes
FROM 
    cases
GROUP BY 
    emcode;