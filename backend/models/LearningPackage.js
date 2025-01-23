"use strict";
// Defines the structure and rules of the LearningPackage table for database interactions
Object.defineProperty(exports, "__esModule", { value: true });
var postgre_db_1 = require("../postgre_db");
var sequelize_1 = require("sequelize");
var LearningPackage = postgre_db_1.default.define('LearningPackage', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    targetAudience: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, { tableName: 'LearningPackage', } // Explicitly set the table name
);
exports.default = LearningPackage;
