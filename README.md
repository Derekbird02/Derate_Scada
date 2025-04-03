SELECT park_name, device_name, variable_name, COUNT(*)
FROM old_table
GROUP BY park_name, device_name, variable_name
HAVING COUNT(*) > 1;
