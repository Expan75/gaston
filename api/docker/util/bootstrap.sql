-- SQL bootstrap script for creating a new db tied to the backend.

-- Only to be used on personal dev environments
CREATE DATABASE gaston;
CREATE USER gaston WITH ENCRYPTED PASSWORD 'gaston';

-- setup full permissions
GRANT CONNECT ON DATABASE gaston TO gaston;
GRANT ALL PRIVILEGES ON DATABASE gaston TO gaston;

-- Only superuser can create extensions
\c gaston
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE DATABASE gaston_test;

-- setup full permissions
GRANT CONNECT ON DATABASE gaston_test TO gaston;
GRANT ALL PRIVILEGES ON DATABASE gaston_test TO gaston;

-- Only superuser can create extensions
\c gaston_test
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
