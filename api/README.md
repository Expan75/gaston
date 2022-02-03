# Gaston API

This is the API for the Gaston menu service. It is effectively a backend monolith written in Typescript, relying on the framework NestJS. It is at the time of writing a standalone piece of software that can be run and developed using only a backing database.

# Getting started

## Core External Dependencies

- [Docker](https://www.docker.com/)
- [NodeJS](https://nodejs.org/en/) >= 16 (or install via [nvm](https://github.com/nvm-sh/nvm))
- [NPM](https://www.npmjs.com/)

## Running the server

Assuming all the above dependencies are installed (and path:able), use the following to start:

1. Download the monorepo
```console
git clone git@github.com:gaston-io/gaston.git
```
2. Install dependencies for the API       
```console
cd gaston/api && npm install
```
3. If setting up for the first time, ensure you follow *./docker/SETUP.md* and bring up the database correctly.
4. Ensure you have the correct environment variables available.
5. Run the server
```console
npm run start:dev       # hot reload
npm run start:debug     # hot reload and extended logging
npm run start:prod      # build and run as production build 
```
6. Alternatively, run tests
```console
npm run test            # unit tests
npm run test:e2e        # e2e tests
npm run test:cov        # test coverage
```
## API Docs

API documentation is maintained automatically using a code-first approach to building a GraphQL schema. The easiest way of utilising this schema (e.g. when testing requests) is to use the GraphQL playground. The playground is automatically exposed if the `NODE_ENV` variable is set to `development`. Concretely, this can be accessed by navivating to the endpoint exposing the running applicaction, i.e. in a browser navigating to the endpoint: *`localhost:{port}/graphql`*.

## Schema and Migrations

The application relies on [MongoDB](https://docs.mongodb.com/), a document NoSQL database. This application uses this database via the [Mongoose](https://mongoosejs.com/), an ORM. Given the schemaless nature of the backing database, the truth of data modeling is that of the models found in the `entities` of every resource. Changes in schema are effectively code changes to the entities.

## Database Setup

To get a local database setup on your system, use docker:
```console
docker compose -f docker/docker-compose.yml up
```
Using the valid `MONGO_DB_CONNECTION_STRING` (see the docker-compose for details and [MongoDB docs](https://docs.mongodb.com/manual/reference/connection-string/) for format), you can now run the application. If you want to manually manipulate data and run queries, use a MongoDB client on your local machine (or use the docker container directly).

## Automated Testing / QA

Both the backend and the frontend are to be covered by both unit and e2e tests. These are automatic and defined in code using [jest.js](https://jestjs.io/). Luckily, this is already integrated into nestJS:

- [NestJS unit testing](https://docs.nestjs.com/fundamentals/testing#unit-testing)
- [NestJS end to end testing](https://docs.nestjs.com/fundamentals/testing#end-to-end-testing)

Run the tests using:
```console
npm run test            # unit tests
npm run test:e2e        # e2e tests
npm run test:cov        # test coverage
```

## Contributing

To contribute to the projet, please see the Monorepo README.md for the **Contributing** section.

## Code Style

Regardless if you are getting reviewed or are reviewing, you should comply with the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html). Note that any programming paradigm is allowed as long as you comply with the above style guide and your code is understandable.

NextJS comes with a configured linter that can be picked up by eslint IDE plugins or run from CLI:

```console
npm run format    # Automatically fixes formatting problems
npm run lint      # Automatically fixes linting problems
```