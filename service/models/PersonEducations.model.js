module.exports = (sequelize, DataTypes) => {
    const personEducations = sequelize.define("PersonEducations", {
        _status: { type: DataTypes.STRING },
        board  : {
            defaultValue: "",
            type        : DataTypes.STRING
        },
        degree: {
            defaultValue: "",
            type        : DataTypes.STRING
        },
        deletedAt: {
            allowNull: true,
            type     : "TIMESTAMP"
        },
        endDate: {
            defaultValue: new Date(),
            type        : "TIMESTAMP"
        },
        endMonth: {
            defaultValue: "",
            type        : DataTypes.STRING
        },
        endYear: {
            defaultValue: "",
            type        : DataTypes.STRING
        },
        field: {
            defaultValue: "",
            type        : DataTypes.STRING
        },
        id: {
            autoIncrement: true,
            primaryKey   : true,
            type         : DataTypes.INTEGER
        },
        isActive: {
            defaultValue: true,
            type        : DataTypes.BOOLEAN
        },
        location: {
            defaultValue: "",
            type        : DataTypes.STRING
        },
        school: {
            defaultValue: "",
            type        : DataTypes.STRING
        },
        startDate: {
            defaultValue: new Date(),
            type        : "TIMESTAMP"
        },
        startMonth: {
            defaultValue: "",
            type        : DataTypes.STRING
        },
        startYear: {
            defaultValue: "",
            type        : DataTypes.STRING
        },
        type: {
            defaultValue: "",
            type        : DataTypes.STRING
        }
    });

    personEducations.associate = (models) => {
        personEducations.belongsTo(models.Persons, {
            foreignKey: "personId",
            sourceKey : "id"
        });
        personEducations.belongsTo(models.Users, {
            as        : "Owner",
            foreignKey: "createdBy",
            sourceKey : "id"
        });
        personEducations.belongsTo(models.Users, {
            as        : "Updater",
            foreignKey: "updatedBy",
            sourceKey : "id"
        });
        personEducations.belongsTo(models.Users, {
            as        : "Destroyer",
            foreignKey: "deletedBy",
            sourceKey : "id"
        });
    };

    return personEducations;
};
