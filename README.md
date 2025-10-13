SELECT
  (date_trunc('day', (current_timestamp AT TIME ZONE 'America/Denver')) AT TIME ZONE 'America/Denver') AT TIME ZONE 'UTC' AS utc_start,
  ((date_trunc('day', (current_timestamp AT TIME ZONE 'America/Denver')) + interval '1 day') AT TIME ZONE 'America/Denver') AT TIME ZONE 'UTC' AS utc_end;
