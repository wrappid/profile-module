const profileController = require("./controllers/profile.controller");
const { CoreMiddlewaresRegistry } = require("@wrappid/service-core");
const {getContactInfo,getAddressTypeSchema,departmentGET,getPersonContacts,getRegistrationInfo,putBasicDetails,putRegistrationDetails,postUpdateEducation} = require("./validations/profile.validation");
const controllersRegistry = {
    getContactInfo : [CoreMiddlewaresRegistry.validation(getContactInfo),profileController.getContactInfo],
    getAddressType  : [CoreMiddlewaresRegistry.validation(getAddressTypeSchema), profileController.getAddressType],
    getDepartment  : [CoreMiddlewaresRegistry.validation(departmentGET), profileController.getDepartment],
    getpersonContacts : [CoreMiddlewaresRegistry.validation(getPersonContacts),profileController.getPersonContacts],
    getRegistrationInfo: [CoreMiddlewaresRegistry.validation(getRegistrationInfo),profileController.getRegistrationInfo],
    putBasicDetails: [CoreMiddlewaresRegistry.validation(putBasicDetails),CoreMiddlewaresRegistry.fileHandler.single("photo"),profileController.putBasicDetails],
    putRegistrationDetails : [CoreMiddlewaresRegistry.validation(putRegistrationDetails),CoreMiddlewaresRegistry.fileHandler.single("registrationDocument"),profileController.putRegistrationDetails],
    postUpdateEducation : [CoreMiddlewaresRegistry.validation(postUpdateEducation),profileController.postUpdateEducation]


};

exports.controllersRegistry = controllersRegistry;