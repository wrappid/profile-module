import { AddressTypes } from "./models/AddressTypes.model";
import { PersonAddresses } from "./models/PersonAddresses.model";
import { PersonDocs } from "./models/PersonDocs.model";
import { PersonEducations } from "./models/PersonEducations.model";
import { PersonExperiences } from "./models/PersonExperiences.model";

const ModelsRegistry = {
  AddressTypes: {
    database: "application",
    model: AddressTypes,
  },
  PersonAddresses: {
    database: "application",
    model: PersonAddresses,
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
};

export default ModelsRegistry;
