import { AddressTypes } from "./models/AddressTypes.model";
import { PersonAddresses } from "./models/PersonAddresses.model";
import { PersonContacts } from "./models/PersonContacts.model";
import { PersonDocs } from "./models/PersonDocs.model";
import { PersonEducations } from "./models/PersonEducations.model";
import { PersonExperiences } from "./models/PersonExperiences.model";
import { PersonRelations } from "./models/PersonRelations.model";
import { Persons } from "./models/Persons.model";
import { Relations } from "./models/Relations.model";

const ModelsRegistry = {
  AddressTypes: {
    database: "application",
    model: AddressTypes,
  },
  PersonAddresses: {
    database: "application",
    model: PersonAddresses,
  },
  PersonContacts: {
    database: "application",
    model: PersonContacts,
  },
  PersonDocs: {
    database: "application",
    model: PersonDocs,
  },
  PersonEducations: {
    database: "application",
    model: PersonEducations,
  },
  PersonExperiences: {
    database: "application",
    model: PersonExperiences,
  },
  PersonRelations: {
    database: "application",
    model: PersonRelations,
  },
  Persons: {
    database: "application",
    model: Persons,
  },
  Relations: {
    database: "application",
    model: Relations,
  },
};

export default ModelsRegistry;
