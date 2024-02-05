const { CoreMiddlewaresRegistry } = require("@wrappid/service-core");

const profileController = require("./controllers/profile.controller");
const {
  getContactInfo,
  getAddressTypeSchema,
  departmentGET,
  getPersonContacts,
  getRegistrationInfo,
  putBasicDetails,
  putRegistrationDetails,
  postAddEducation,
  postUpdateEducation,
  putDeleteEducation,
  postAddExperience,
  putUpdateExperience,
  putDeleteExperience
} = require("./validations/profile.validation");

const controllersRegistry = {
  getAddressType        : [CoreMiddlewaresRegistry.validation(getAddressTypeSchema), profileController.getAddressType],
  getContactInfo        : [CoreMiddlewaresRegistry.validation(getContactInfo), profileController.getContactInfo],
  getDepartment         : [CoreMiddlewaresRegistry.validation(departmentGET), profileController.getDepartment],
  getRegistrationInfo   : [CoreMiddlewaresRegistry.validation(getRegistrationInfo), profileController.getRegistrationInfo],
  getpersonContacts     : [CoreMiddlewaresRegistry.validation(getPersonContacts), profileController.getPersonContacts],
  postAddEducation      : [CoreMiddlewaresRegistry.validation(postAddEducation), profileController.postAddEducation],
  postAddExperience     : [CoreMiddlewaresRegistry.validation(postAddExperience), profileController.postAddExperience],
  putBasicDetails       : [CoreMiddlewaresRegistry.validation(putBasicDetails), CoreMiddlewaresRegistry.fileHandler({ filename: "photo" }), profileController.putBasicDetails],
  putDeleteEducation    : [CoreMiddlewaresRegistry.validation(putDeleteEducation), profileController.putDeleteEducation],
  putDeleteExperience   : [CoreMiddlewaresRegistry.validation(putDeleteExperience), profileController.putDeleteExperience],
  putRegistrationDetails: [CoreMiddlewaresRegistry.validation(putRegistrationDetails), CoreMiddlewaresRegistry.fileHandler({ filename: "registrationDocument" }), profileController.putRegistrationDetails],
  putUpdateEducation    : [CoreMiddlewaresRegistry.validation(postUpdateEducation), profileController.putUpdateEducation],
  putUpdateExperience   : [CoreMiddlewaresRegistry.validation(putUpdateExperience), profileController.putUpdateExperience]
};

exports.controllersRegistry = controllersRegistry;
