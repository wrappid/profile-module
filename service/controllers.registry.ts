import { CoreMiddlewaresRegistry } from "@wrappid/service-core";

import * as profileController from "./controllers/profile.controller";
import {
  getContactInfo,
  getAddressTypeSchema,
  getPersonContacts,
  putBasicDetails,
  postAddEducation,
  postUpdateEducation,
  putDeleteEducation,
  postAddExperience,
  putUpdateExperience,
  putDeleteExperience,
} from "./validations/profile.validation";

const ControllersRegistry = {
  getAddressType: [
    CoreMiddlewaresRegistry.validation(getAddressTypeSchema),
    profileController.getAddressType,
  ],
  getContactInfo: [
    CoreMiddlewaresRegistry.validation(getContactInfo),
    profileController.getContactInfo,
  ],
  getPersonContacts: [
    CoreMiddlewaresRegistry.validation(getPersonContacts),
    profileController.getPersonContacts,
  ],
  postAddEducation: [
    CoreMiddlewaresRegistry.validation(postAddEducation),
    profileController.postAddEducation,
  ],
  postAddExperience: [
    CoreMiddlewaresRegistry.validation(postAddExperience),
    profileController.postAddExperience,
  ],
  putBasicDetails: [
    CoreMiddlewaresRegistry.validation(putBasicDetails),
    CoreMiddlewaresRegistry.fileHandler({ filename: "photo" }),
    profileController.putBasicDetails,
  ],
  putDeleteEducation: [
    CoreMiddlewaresRegistry.validation(putDeleteEducation),
    profileController.putDeleteEducation,
  ],
  putDeleteExperience: [
    CoreMiddlewaresRegistry.validation(putDeleteExperience),
    profileController.putDeleteExperience,
  ],
  putUpdateEducation: [
    CoreMiddlewaresRegistry.validation(postUpdateEducation),
    profileController.putUpdateEducation,
  ],
  putUpdateExperience: [
    CoreMiddlewaresRegistry.validation(putUpdateExperience),
    profileController.putUpdateExperience,
  ],
};

export default ControllersRegistry;
