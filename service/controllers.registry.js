const profileController = require("./controllers/profile.controller");
const { CoreMiddlewaresRegistry } = require("@wrappid/service-core");
const {getContactInfo,getAddressTypeSchema,departmentGET} = require("./validations/profile.validation");
const controllersRegistry = {
    getContactInfo : [CoreMiddlewaresRegistry.validation(getContactInfo),profileController.getContactInfo],
    getAddressType  : [CoreMiddlewaresRegistry.validation(getAddressTypeSchema), profileController.getAddressType],
    getDepartment  : [CoreMiddlewaresRegistry.validation(departmentGET), profileController.getDepartment],
};

exports.controllersRegistry = controllersRegistry;