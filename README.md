WITH user_mapping AS (
    SELECT * FROM (
        VALUES
            ('jdoe', '2230421', 'John Doe'),
            ('tommy', '36574781', 'Tommy Lee')
    ) AS t(username, number, fullname)
)
