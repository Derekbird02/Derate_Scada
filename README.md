curl -X POST http://your-grafana-url/api/invites ^
-H "Authorization: Bearer YOUR_API_KEY" ^
-H "Content-Type: application/json" ^
-d "{\"invites\": [{\"email\": \"user@example.com\", \"name\": \"User One\", \"role\": \"Viewer\"}]}"