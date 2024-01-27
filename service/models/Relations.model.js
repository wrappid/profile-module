module.exports = (sequelize, DataTypes) => {
  const relations = sequelize.define("Relations", {
    _status  : { type: DataTypes.STRING },
    deletedAt: {
      allowNull: true,
      type     : "TIMESTAMP"
    },
    extraInfo: {
      defaultValue: null,
      type        : DataTypes.JSONB
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
    name: {
      defaultValue: "",
      type        : DataTypes.STRING
    }
  });

  relations.associate = (models) => {
    relations.belongsTo(models.Users, {
      as        : "Owner",
      foreignKey: "createdBy",
      sourceKey : "id"
    });
    relations.belongsTo(models.Users, {
      as        : "Updater",
      foreignKey: "updatedBy",
      sourceKey : "id"
    });
    relations.hasMany(models.PersonRelations, {
      foreignKey: "relationId",
      sourceKey : "id"
    });
    relations.belongsTo(models.Users, {
      as        : "Destroyer",
      foreignKey: "deletedBy",
      sourceKey : "id"
    });
  };

  return relations;
};