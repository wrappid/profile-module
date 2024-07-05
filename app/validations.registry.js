import * as authValidation from "./validations/profile.validation";

export const ValidationsRegistry = { 
  profileBaic        : authValidation.profileBaic,
  profileEducation   : authValidation.profileEducation,
  profileExperience  : authValidation.profileExperience,
  profileRegistration: authValidation.profileRegistration,
};