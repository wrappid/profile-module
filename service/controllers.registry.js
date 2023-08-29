const profileController = require("./controllers/profile.controller");
const { CoreMiddlewaresRegistry } = require("@wrappid/service-core");
const {getContactInfo} = require("./validations/profile.validation");
const controllersRegistry = {
    getContactInfo : [CoreMiddlewaresRegistry.validation(getContactInfo),profileController.getContactInfo]
};

exports.controllersRegistry = controllersRegistry;