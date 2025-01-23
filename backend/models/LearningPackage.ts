// Defines the structure and rules of the LearningPackage table for database interactions

import sequelize from "../postgre_db";
import { DataTypes } from "sequelize";

const LearningPackage = sequelize.define('LearningPackage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    targetAudience: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    { tableName: 'LearningPackage', } // Explicitly set the table name
);

export default LearningPackage;
