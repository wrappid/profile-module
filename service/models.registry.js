const TestDatas = require("./models/TestDatas.model");
const personAddresses = require("../../auth-module/service/models/PersonAddresses.model");
const modelsRegistry = {
    "TestDatas": {
        database: "application",
        model   : TestDatas
    },
    "personAddresses": {
        database : "application",
        model: personAddresses
    },
    
};

exports.modelsRegistry = modelsRegistry;