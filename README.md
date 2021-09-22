# Surveys App

This simple api will let you create surveys, collect answers from the users and see the results.

The api is composed of the following endpoints:

- List Surveys GET /api/survey
- Get Survey GET /api/survey/:id
- Create Survey POST /api/survey
- Submit Answer PUT /api/survey/:id

App implements request body validation for creating surveys and submiting the answers.
The data is persistent thanks to our sophisticated json file database.
This storage was developed with KISS and YAGNI principles in mind :D.

## Storage

The interface of the repository module was designed in the way,
that should allow you to easily substitute it with other data source.

To achieve that you should:

0. Implement own repository with the same public interface as file-repository.js.

1. Use the Environment Variables to inject into service the right version of repository based on the variable value.

Application has complete 100% test coverage.

# Running App locally

## Before you start

Before you start be sure that you have nodejs and npm installed.
If you have run the following command in your terminal to install dependencies:

        npm install

## Running app localy

To run app locally use command:

        npm run start

To run app in development mode:

        npm run dev
