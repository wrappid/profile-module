const AddressTypes = require("./models/AddressTypes.model");
const PersonAddresses = require("./models/PersonAddresses.model");
const PersonContacts = require("./models/PersonContacts.model");
const PersonDocs = require("./models/PersonDocs.model");
const PersonEducations = require("./models/PersonEducations.model");
const PersonExperiences = require("./models/PersonExperiences.model");
const PersonRelations = require("./models/PersonRelations.model");
const Persons = require("./models/Persons.model");
const Relations = require("./models/Relations.model");
const modelsRegistry = {
  AddressTypes: {
    database: "application",
    model   : AddressTypes
  },
  PersonAddresses: {
    database: "application",
    model   : PersonAddresses
  },
  PersonContacts: {
    database: "application",
    model   : PersonContacts
  },
  PersonDocs: {
    database: "application",
    model   : PersonDocs
  },
  PersonEducations: {
    database: "application",
    model   : PersonEducations
  },
  PersonExperiences: {
    database: "application",
    model   : PersonExperiences
  },
  PersonRelations: {
    database: "application",
    model   : PersonRelations
  },
  Persons: {
    database: "application",
    model   : Persons
  },
  Relations: {
    database: "application",
    model   : Relations
  }
};

exports.modelsRegistry = modelsRegistry;
