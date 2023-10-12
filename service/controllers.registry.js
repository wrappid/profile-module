const profileController = require("./controllers/profile.controller");
const { CoreMiddlewaresRegistry } = require("@wrappid/service-core");
const {getContactInfo,getAddressTypeSchema,departmentGET,getPersonContacts,getRegistrationInfo,putBasicDetails,putRegistrationDetails,postAddEducation, postUpdateEducation,putDeleteEducation,postAddExperience,putUpdateExperience,putDeleteExperience} = require("./validations/profile.validation");
const controllersRegistry = {
    getContactInfo : [CoreMiddlewaresRegistry.validation(getContactInfo),profileController.getContactInfo],
    getAddressType  : [CoreMiddlewaresRegistry.validation(getAddressTypeSchema), profileController.getAddressType],
    getDepartment  : [CoreMiddlewaresRegistry.validation(departmentGET), profileController.getDepartment],
    getpersonContacts : [CoreMiddlewaresRegistry.validation(getPersonContacts),profileController.getPersonContacts],
    getRegistrationInfo: [CoreMiddlewaresRegistry.validation(getRegistrationInfo),profileController.getRegistrationInfo],
    putBasicDetails: [CoreMiddlewaresRegistry.validation(putBasicDetails),CoreMiddlewaresRegistry.fileHandler({filename:'photo'}),profileController.putBasicDetails],
    putRegistrationDetails : [CoreMiddlewaresRegistry.validation(putRegistrationDetails),CoreMiddlewaresRegistry.fileHandler({filename:"registrationDocument"}),profileController.putRegistrationDetails],
    postAddEducation : [CoreMiddlewaresRegistry.validation(postAddEducation),profileController.postAddEducation],
    putUpdateEducation: [CoreMiddlewaresRegistry.validation(postUpdateEducation), profileController.putUpdateEducation],
    putDeleteEducation: [CoreMiddlewaresRegistry.validation(putDeleteEducation),profileController.putDeleteEducation],
    postAddExperience: [CoreMiddlewaresRegistry.validation(postAddExperience),profileController.postAddExperience],
    putUpdateExperience: [CoreMiddlewaresRegistry.validation(putUpdateExperience),profileController.putUpdateExperience],
    putDeleteExperience: [CoreMiddlewaresRegistry.validation(putDeleteExperience),profileController.putDeleteExperience],

};

exports.controllersRegistry = controllersRegistry;