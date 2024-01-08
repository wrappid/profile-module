const AddressTypes = require("./models/AddressTypes.model");
const modelsRegistry = {
  AddressTypes: {
    database: "application",
    model   : AddressTypes
  }
};

exports.modelsRegistry = modelsRegistry;
