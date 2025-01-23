// Synchronizes models with the database by creating or updating tables

import LearningPackage from "./models/LearningPackage";
import LearningFact from "./models/LearningFact";
import sequelize from "./postgre_db";

console.log('Model registered :', LearningPackage === sequelize.models.LearningPackage);
console.log('Model registered :', LearningFact === sequelize.models.LearningFact);


sequelize.sync({ force: true }) // force: true recreates the tables on each execution
    .then(() => {
        console.log('The tables have been successfully synchronized.');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error while synchronizing the tables :', err);
        process.exit(1);
    });