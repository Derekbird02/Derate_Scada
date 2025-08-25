WITH site_tz AS (
    SELECT 
        si.siteid,
        si.timezone
    FROM site_info si
    WHERE si.siteid = $1   -- siteid parameter
),
midnight_bounds AS (
    SELECT
        s.siteid,
        s.timezone,
        -- Get midnight in site’s local time
        (DATE_TRUNC('day', (CURRENT_DATE AT TIME ZONE s.timezone)) AT TIME ZONE s.timezone) AS site_midnight,
        -- Convert to ET (since state_info is stored in ET)
        (DATE_TRUNC('day', (CURRENT_DATE AT TIME ZONE s.timezone)) AT TIME ZONE s.timezone AT TIME ZONE 'America/New_York') AS midnight_et
    FROM site_tz s
),
asset_list AS (
    SELECT a.assetid, a.siteid
    FROM asset_info a
    WHERE a.siteid = $1
),
status_at_midnight AS (
    SELECT 
        a.assetid,
        st.ieccode
    FROM asset_list a
    JOIN midnight_bounds mb ON mb.siteid = a.siteid
    JOIN state_info st 
        ON st.assetid = a.assetid
       AND st.insertdate = mb.midnight_et  -- state_info recorded at ET midnight
),
trips_last_24h AS (
    SELECT 
        a.assetid,
        COUNT(*) AS trip_count
    FROM asset_list a
    JOIN midnight_bounds mb ON mb.siteid = a.siteid
    JOIN cases c 
        ON c.assetid = a.assetid
       AND c.type = 2
       AND c.createdate >= mb.site_midnight
       AND c.createdate < mb.site_midnight + interval '1 day'
    GROUP BY a.assetid
)
SELECT 
    a.assetid,
    COALESCE(sm.ieccode::text, 'NoStatus') || ' - ' || COALESCE(t.trip_count, 0)::text AS status_and_trips
FROM asset_list a
LEFT JOIN status_at_midnight sm ON sm.assetid = a.assetid
LEFT JOIN trips_last_24h t ON t.assetid = a.assetid
ORDER BY a.assetid;
