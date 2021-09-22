**Surveys App**

This simple api will let you create surveys and collect the answers from the users.

The api is composed of the following endpoints:

- List Surveys Get /api/survey
- Get Survey Get /api/survey/:id
- Create Survey Post /api/survey
- Submit Answer Put /api/survey/:id

App implements request body validation for creating surveys and submiting the answers.
The data is persistent thanks to our sophisticated json file database.

Application has complete 100% test coverage.

**Running App locally**

## Before you start

Before you start be sure that you have nodejs and npm installed.
If you have run the following command in your terminal to install dependencies:

        npm install

## Running app localy

To run app locally use command:

        npm run start

To run app in development mode:

        npm run dev
