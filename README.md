SELECT
  elem ->> 'name' AS series_name,
  (jsonb_array_elements_text(elem -> 'x')).value::timestamp AS ts,
  (jsonb_array_elements(elem -> 'y')).value::float8 AS value
FROM your_table,
  jsonb_array_elements(json_data -> 'data') AS elem,
  LATERAL jsonb_array_elements_text(elem -> 'x') WITH ORDINALITY AS x(val, idx1),
  LATERAL jsonb_array_elements(elem -> 'y') WITH ORDINALITY AS y(val, idx2)
WHERE idx1 = idx2
