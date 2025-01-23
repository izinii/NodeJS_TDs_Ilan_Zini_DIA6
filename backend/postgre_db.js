"use strict";
// Configures and establishes the PostgreSQL database connection
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize('LearningFactDb', 'learningDbUser', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
});
// Tester la connexion
sequelize.authenticate()
    .then(function () { return console.log('Connection to PostgreSQL successful.'); })
    .catch(function (err) { return console.error('Unable to connect :', err); });
exports.default = sequelize;
