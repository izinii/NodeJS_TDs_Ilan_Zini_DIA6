# NodeJS & React Dev. - TDs - Ilan Zini (DIA6)


## Backend Overview:

This is a Node.js project using Express.js for the API and Sequelize to interact with a PostgreSQL database.


## Quick Start:

1. Install dependencies:
    `npm install`


2. Ensure you have PostgreSQL running locally with the following credentials:
   - Database Name: **LearningFactDb**
   - Username: **learningDbUser**
   - Password: **admin**


3. Start the server: run `tsc` to compile TypeScript, then execute the main file:
   `node app-todo.js`


4. API will be available at http://localhost:3000/swagger-ui. 


## Notes:

- Main entry file: `app-todo.ts`.
- File `sync_postgre_db.ts` is used to synchronize models and create tables. Run it if you need to reset the database structure.
- Swagger documentation is available at `/swagger-ui` for testing API endpoints.