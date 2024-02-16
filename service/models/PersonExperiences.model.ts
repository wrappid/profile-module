export const PersonExperiences = (sequelize: any, DataTypes: any) => {
  const personExperiences = sequelize.define("PersonExperiences", {
    _status: { type: DataTypes.STRING },
    deletedAt: {
      allowNull: true,
      type: "TIMESTAMP",
    },
    description: {
      defaultValue: "",
      type: DataTypes.STRING,
    },
    designation: {
      defaultValue: "",
      type: DataTypes.STRING,
    },
    endDate: {
      defaultValue: new Date(),
      type: "TIMESTAMP",
    },
    endMonth: {
      defaultValue: "",
      type: DataTypes.STRING,
    },
    endYear: {
      defaultValue: "",
      type: DataTypes.STRING,
    },
    field: {
      defaultValue: "",
      type: DataTypes.STRING,
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
    location: {
      defaultValue: "",
      type: DataTypes.STRING,
    },
    organization: {
      defaultValue: "",
      type: DataTypes.STRING,
    },
    startDate: {
      defaultValue: new Date(),
      type: "TIMESTAMP",
    },
    startMonth: {
      defaultValue: "",
      type: DataTypes.STRING,
    },
    startYear: {
      defaultValue: "",
      type: DataTypes.STRING,
    },
    type: {
      defaultValue: "",
      type: DataTypes.STRING,
    },
  });

  personExperiences.associate = (models: any) => {
    personExperiences.belongsTo(models.Persons, {
      foreignKey: "personId",
      sourceKey: "id",
    });
    personExperiences.belongsTo(models.Users, {
      as: "Owner",
      foreignKey: "createdBy",
      sourceKey: "id",
    });
    personExperiences.belongsTo(models.Users, {
      as: "Updater",
      foreignKey: "updatedBy",
      sourceKey: "id",
    });
    personExperiences.belongsTo(models.Users, {
      as: "Destroyer",
      foreignKey: "deletedBy",
      sourceKey: "id",
    });
  };

  return personExperiences;
};
