module.exports = (sequelize, DataTypes) => {
    const personDocs = sequelize.define("PersonDocs", {
        _status  : { type: DataTypes.STRING },
        deletedAt: {
            allowNull: true,
            type     : "TIMESTAMP"
        },
        description: {
            defaultValue: "",
            type        : DataTypes.STRING
        },
        docUrl: {
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
        type: {
            defaultValue: "",
            type        : DataTypes.STRING
        }
    });

    personDocs.associate = (models) => {
        personDocs.belongsTo(models.Persons, {
            foreignKey: "personId",
            sourceKey : "id"
        });
        personDocs.belongsTo(models.Users, {
            as        : "Owner",
            foreignKey: "createdBy",
            sourceKey : "id"
        });
        personDocs.belongsTo(models.Users, {
            as        : "Updater",
            foreignKey: "updatedBy",
            sourceKey : "id"
        });
        personDocs.belongsTo(models.Users, {
            as        : "Destroyer",
            foreignKey: "deletedBy",
            sourceKey : "id"
        });
    };

    return personDocs;
};
