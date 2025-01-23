import sequelize from "../postgre_db";
import { DataTypes } from "sequelize";

const LearningFact = sequelize.define('LearningFact', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fact: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    confidenceLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    reviewedCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    isDisabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    learningPackageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'LearningPackage',
            key: 'id',
        },
    },
}, {
    tableName: 'LearningFact',
});

export default LearningFact;
