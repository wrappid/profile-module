/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const doctorDetails = sequelize.define("DoctorDetails", {
    _status  : { type: DataTypes.STRING },
    addlqual1: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    addlqual2: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    addlqual3: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    addlqualuniv1: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    addlqualuniv2: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    addlqualuniv3: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    addlqualyear1: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    addlqualyear2: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    addlqualyear3: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    address: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    addressLine1: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    addressLine2: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    adharNo: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    altphone: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    appealBy: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    birthDate: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    birthDateStr: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    birthPlace: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    bloodGroup: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    catagory: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    catagory_view: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    checkExistingUser: {
      defaultValue: true,
      type        : DataTypes.BOOLEAN,
    },
    city: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    college: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    collegeId: {
      defaultValue: 0,
      type        : DataTypes.INTEGER,
    },
    country: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    countryType: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    dateOfBirth: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    deletedAt: {
      allowNull: true,
      type     : "TIMESTAMP",
    },
    docId: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    doctRegistrationNo: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    doctorDegree: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    doctorEducationId: {
      defaultValue: 0,
      type        : DataTypes.INTEGER,
    },
    economicStatus: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    eligbleToVote: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    emailId: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    extraInfo: {
      defaultValue: null,
      type        : DataTypes.JSONB,
    },
    firstName: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    gender: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    homeAddress: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    id: {
      autoIncrement: true,
      primaryKey   : true,
      type         : DataTypes.INTEGER,
    },
    imrNumber: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    isActive: {
      defaultValue: true,
      type        : DataTypes.BOOLEAN,
    },
    isNewDoctor: {
      defaultValue: true,
      type        : DataTypes.BOOLEAN,
    },
    landLineNo: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    lastName: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    middleName: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    monthOfPass: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    monthandyearOfPass: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    nationality: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    officeAddress: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    officeaddress: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    otherSubject: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    parentName: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    passoutCollege: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    patientaltphone: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    patientemailId: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    patientfirstName: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    patientlandLineNo: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    patientlastName: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    patientmiddleName: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    patientphoneNo: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    phoneNo: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    photos: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    picName: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    pincode: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    qualification: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    regDate: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    regLink: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    regNo: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    regYear: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    registrationDate: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    registrationDatePrevious: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    registrationNo: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    registrationNoPrevious: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    regnNo: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    remarks: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    removedOn: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    removedStatus: {
      defaultValue: true,
      type        : DataTypes.BOOLEAN,
    },
    restoredOn: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    restoredStatus: {
      defaultValue: true,
      type        : DataTypes.BOOLEAN,
    },
    role: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    salutation: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    signatureName: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    smcId: {
      defaultValue: 0,
      type        : DataTypes.INTEGER,
    },
    smcIds: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    smcName: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    smcNamePrevious: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    state: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    stateId: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    stateMedicalCouncil: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    trasanctionStatus: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    university: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    universityId: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    universityId_view: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    universityName: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    uprnNo: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    uprnNoPrevious: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    yearInfo: {
      defaultValue: 0,
      type        : DataTypes.INTEGER,
    },
    yearOfPassing: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
  });

  doctorDetails.associate = (models) => {
    doctorDetails.belongsTo(models.Persons, {
      as        : "Persons",
      foreignKey: "doctorId",
      sourceKey : "id",
    });
    doctorDetails.belongsTo(models.Users, {
      as        : "Owner",
      foreignKey: "createdBy",
      sourceKey : "id",
    });
    doctorDetails.belongsTo(models.Users, {
      as        : "Updater",
      foreignKey: "updatedBy",
      sourceKey : "id",
    });
    doctorDetails.belongsTo(models.Users, {
      as        : "Destroyer",
      foreignKey: "deletedBy",
      sourceKey : "id",
    });
  };

  return doctorDetails;
};

module.exports = (sequelize, DataTypes) => {
  const personDocs = sequelize.define("PersonDocs", {
    _status  : { type: DataTypes.STRING },
    deletedAt: {
      allowNull: true,
      type     : "TIMESTAMP",
    },
    description: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    docUrl: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
    id: {
      autoIncrement: true,
      primaryKey   : true,
      type         : DataTypes.INTEGER,
    },
    isActive: {
      defaultValue: true,
      type        : DataTypes.BOOLEAN,
    },
    type: {
      defaultValue: "",
      type        : DataTypes.STRING,
    },
  });

  personDocs.associate = (models) => {
    personDocs.belongsTo(models.Persons, {
      foreignKey: "personId",
      sourceKey : "id",
    });
    personDocs.belongsTo(models.Users, {
      as        : "Owner",
      foreignKey: "createdBy",
      sourceKey : "id",
    });
    personDocs.belongsTo(models.Users, {
      as        : "Updater",
      foreignKey: "updatedBy",
      sourceKey : "id",
    });
    personDocs.belongsTo(models.Users, {
      as        : "Destroyer",
      foreignKey: "deletedBy",
      sourceKey : "id",
    });
  };

  return personDocs;
};
