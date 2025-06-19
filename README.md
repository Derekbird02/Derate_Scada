SELECT
  f.id,
  elem ->> 'name' AS series_name,
  x_vals.value::timestamp AS ts,
  y_vals.value::float8 AS value
FROM workflows w
JOIN figures f ON w.wfid = f.wfid
WHERE w.wfid = '2342123'
  AND get_byte(f."binary", 0) = ascii('{')  -- only JSON blobs
  -- or: AND convert_from(f."binary", 'UTF-8') LIKE '{%'

-- Now parse JSON
, LATERAL jsonb_array_elements( (convert_from(f."binary", 'UTF-8'))::jsonb -> 'data' ) AS elem
, LATERAL jsonb_array_elements_text(elem -> 'x') WITH ORDINALITY AS x_vals(value, idx1)
, LATERAL jsonb_array_elements(elem -> 'y') WITH ORDINALITY AS y_vals(value, idx2)
WHERE idx1 = idx2
