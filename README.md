SELECT
  elem ->> 'name' AS series_name,
  x_values.value::timestamp AS ts,
  y_values.value::float8 AS value
FROM your_table,
  LATERAL jsonb_array_elements( (convert_from("binary", 'UTF-8'))::jsonb -> 'data' ) AS elem,
  LATERAL jsonb_array_elements_text(elem -> 'x') WITH ORDINALITY AS x_values(value, idx1),
  LATERAL jsonb_array_elements(elem -> 'y') WITH ORDINALITY AS y_values(value, idx2)
WHERE idx1 = idx2
