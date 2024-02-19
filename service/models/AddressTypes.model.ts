export const AddressTypes = (sequelize: any, DataTypes: any) => {
  const addressTypes = sequelize.define("AddressTypes", {
    _status: { type: DataTypes.STRING },
    deletedAt: {
      allowNull: true,
      type: "TIMESTAMP",
    },
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    isActive: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
    type: {
      defaultValue: "",
      type: DataTypes.STRING,
    },
  });

  addressTypes.associate = (models: any) => {
    if(models.PersonAddresses){
      addressTypes.hasMany(models.PersonAddresses, {
        foreignKey: "addressTypeId",
        sourceKey: "id",
      });
    }
    if(models.Users){
      addressTypes.belongsTo(models.Users, {
        as: "Owner",
        foreignKey: "createdBy",
        sourceKey: "id",
      });
      addressTypes.belongsTo(models.Users, {
        as: "Updater",
        foreignKey: "updatedBy",
        sourceKey: "id",
      });
      addressTypes.belongsTo(models.Users, {
        as: "Destroyer",
        foreignKey: "deletedBy",
        sourceKey: "id",
      });
    }
  };

  return addressTypes;
};
