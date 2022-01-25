# Minor note regarding first time setup

If it is your first time setting up the database locally, you will need to run the bootstrap script.
Follow the steps below to bring up the database container, and then creating the DB and appropriate roles.

# Dependencies

- [Docker](https://www.docker.com/)
- [psql](https://www.postgresql.org/docs/13/app-psql.html)

# Getting started

1. Bring the container up (make sure your docker daemon is running!). This might take a couple of minutes.
    ```console
    $ docker compose -f ./docker/docker-compose up
    ```

2. Verify you have DB shell access (use the login details in *docker-compose.yml*):
    ```console
    $ psql -U root -h localhost
    > quit;
    ```
3. Run the bootstrap script. Make sure psql is installed and use the default password listed in *docker-compose.yml* when prompted:
    ```console
    $ psql -U root -h localhost -f ./docker/util/bootsrap.sql
    ```
4. Optionally verify the connection straight to the database (the same access the application relies on):
    ```console
    $ psql -U gaston -h localhost -d gaston
    > quit;
    ```
5. Done! Make sure you have the correct connection details (last steps details) available as environment variables before running the app.