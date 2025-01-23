"use strict";
// Synchronizes models with the database by creating or updating tables
Object.defineProperty(exports, "__esModule", { value: true });
var LearningPackage_1 = require("./models/LearningPackage");
var postgre_db_1 = require("./postgre_db");
console.log('Modèle enregistré :', LearningPackage_1.default === postgre_db_1.default.models.LearningPackage);
postgre_db_1.default.sync({ force: true }) // `force: true` recree les tables a chaque execution
    .then(function () {
    console.log('Les tables ont été synchronisées avec succès.');
    process.exit(0);
})
    .catch(function (err) {
    console.error('Erreur lors de la synchronisation des tables :', err);
    process.exit(1);
});
