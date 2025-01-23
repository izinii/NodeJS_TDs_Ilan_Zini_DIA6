"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var postgre_db_1 = require("../postgre_db");
var sequelize_1 = require("sequelize");
var LearningFact = postgre_db_1.default.define('LearningFact', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fact: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    confidenceLevel: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    reviewedCount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    isDisabled: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    learningPackageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'LearningPackage',
            key: 'id',
        },
    },
}, {
    tableName: 'LearningFact',
});
exports.default = LearningFact;
