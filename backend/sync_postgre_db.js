"use strict";
// Synchronizes models with the database by creating or updating tables
Object.defineProperty(exports, "__esModule", { value: true });
var LearningPackage_1 = require("./models/LearningPackage");
var LearningFact_1 = require("./models/LearningFact");
var postgre_db_1 = require("./postgre_db");
console.log('Model registered :', LearningPackage_1.default === postgre_db_1.default.models.LearningPackage);
console.log('Model registered :', LearningFact_1.default === postgre_db_1.default.models.LearningFact);
postgre_db_1.default.sync({ force: true }) // force: true recreates the tables on each execution
    .then(function () {
    console.log('The tables have been successfully synchronized.');
    process.exit(0);
})
    .catch(function (err) {
    console.error('Error while synchronizing the tables :', err);
    process.exit(1);
});
