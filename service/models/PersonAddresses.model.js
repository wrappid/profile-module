module.exports = (sequelize, DataTypes) => {
  const personAddresses = sequelize.define("PersonAddresses", {
    _status : { type: DataTypes.STRING },
    addLine1: {
      defaultValue: "",
      type        : DataTypes.STRING
    },
    addLine2: {
      defaultValue: "",
      type        : DataTypes.STRING
    },
    city: {
      defaultValue: "",
      type        : DataTypes.STRING
    },
    country: {
      defaultValue: "",
      type        : DataTypes.STRING
    },
    deletedAt: {
      allowNull: true,
      type     : "TIMESTAMP"
    },
    district: {
      defaultValue: "",
      type        : DataTypes.STRING
    },
    fullName: {
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
    isDefault: {
      defaultValue: true,
      type        : DataTypes.BOOLEAN
    },
    landmark: {
      defaultValue: "",
      type        : DataTypes.STRING
    },
    phone: {
      defaultValue: "",
      type        : DataTypes.STRING
    },
    pin: {
      defaultValue: "",
      type        : DataTypes.STRING
    },
    state: {
      defaultValue: "",
      type        : DataTypes.STRING
    },
    status: {
      defaultValue: "",
      type        : DataTypes.STRING
    }
  });

  personAddresses.associate = (models) => {
    personAddresses.belongsTo(models.Persons, {
      as        : "Person",
      foreignKey: "personId",
      sourceKey : "id"
    });
    personAddresses.belongsTo(models.Users, {
      as        : "Owner",
      foreignKey: "createdBy",
      sourceKey : "id"
    });
    personAddresses.belongsTo(models.Users, {
      as        : "Updater",
      foreignKey: "updatedBy",
      sourceKey : "id"
    });
    personAddresses.belongsTo(models.AddressTypes, {
      foreignKey: "addressTypeId",
      sourceKey : "id"
    });
    personAddresses.hasOne(models.Clinics, {
      foreignKey: "personAddressId",
      sourceKey : "id"
    });
    personAddresses.belongsTo(models.Users, {
      as        : "Destroyer",
      foreignKey: "deletedBy",
      sourceKey : "id"
    });
  };

  return personAddresses;
};
