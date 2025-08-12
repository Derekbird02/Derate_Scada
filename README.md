-- 1. Create the new user
CREATE USER new_user WITH PASSWORD 'strong_password';

-- 2. Allow the user to see the target schema
GRANT USAGE ON SCHEMA myschema TO new_user;

-- 3. Give full access to all existing tables in the schema
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA myschema TO new_user;

-- 4. Give full access to all existing sequences in the schema
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA myschema TO new_user;

-- 5. Ensure all future tables also have the correct permissions
ALTER DEFAULT PRIVILEGES IN SCHEMA myschema
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO new_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA myschema
GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO new_user;

-- 6. Revoke access to the public schema (optional, for security)
REVOKE ALL ON SCHEMA public FROM public;
REVOKE ALL ON SCHEMA public FROM new_user;
