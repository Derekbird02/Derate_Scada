-- DST-safe current date Central midnight, expressed in Eastern
(date_trunc('day', now() AT TIME ZONE 'US/Central') + interval '1 hour') AT TIME ZONE 'US/Eastern'
