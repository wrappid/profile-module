const express = require("express");

const profileController = require("../controllers/profile.controller");

const profileRouter = express.Router();

profileRouter.get("/rx/registrationInfo", profileController.getRegistrationInfo);
profileRouter.get("/rx/contactInfo", profileController.getContactInfo);
profileRouter.post("/addContact", profileController.postContact);
profileRouter.put("/contact/:id/delete", profileController.updateContact);
profileRouter.get("/rx/personContacts", profileController.getPersonContact);
profileRouter.put("/changePrimaryContact", profileController.changePrimaryContact);
profileRouter.post("/sentOtp", profileController.postSentOtp);
profileRouter.post("/verifyOtp", profileController.postVerifyOtp);
profileRouter.post("/setPrimaryContacts", profileController.setPrimaryContact);
profileRouter.get("/rx/education/all", profileController.getEducations);
profileRouter.get("/rx/education/individual", profileController.getEducation);
profileRouter.post("/rx/education/", profileController.postEducation);
profileRouter.put("/rx/education/:id", profileController.updateEducation);
profileRouter.patch("/rx/education/:id", profileController.deleteEducation);
profileRouter.get("/rx/experience/all", profileController.getExperiences);
profileRouter.get("/rx/experience/individual", profileController.getExperience);
profileRouter.post("/rx/experience/", profileController.postExperience);
profileRouter.patch("/rx/experience/:id", profileController.updateEducation);
profileRouter.patch("/rx/experience/:id", profileController.deleteExperience);

profileRouter.post("/person/:id/doctorDetails", profileController.postDoctorsDetails);
profileRouter.put("/person/:id/doctorDetails", profileController.updateDoctorsDetails);
profileRouter.put("/person/:id/basicDetails", profileController.updateBasicDetails);
profileRouter.post("/person/:id/address", profileController.postAddress);
profileRouter.put("/address/:id", profileController.updateAddress);
profileRouter.put("/address/:id/delete", profileController.deleteAddress);
profileRouter.post("/person/:id/education", profileController.postEducation);
profileRouter.put("/education/:id", profileController.updateEducation);
profileRouter.put("/education/:id/delete", profileController.deleteEducation);
profileRouter.post("/person/:id/experience", profileController.postExperience);
profileRouter.put("/experience/:id", profileController.updateExperience);
profileRouter.put("/experience/:id/delete", profileController.deleteExperience);
profileRouter.get("/person/:id/completion", profileController.getProfileCompletion);

profileRouter.post("/role/:id/permissions", profileController.updateRolePermissions);
profileRouter.get("/rolePermission", profileController.fetchRolePermissions);

module.exports = profileRouter;

// Following apis are present in business module

// -- export const GET_PROFILE_BASIC_API = "/business/individual/ProfileBasic";
// export const GET_PROFILE_CLINIC_API = "/business/all/ProfileClinic";
// export const GET_PROFILE_EDUCATION_API = "/business/all/ProfileEducation";
// export const GET_PROFILE_EXPERIENCE_API = "/business/all/ProfileExperience";

// -- export const PROFILE_COMPLETENESS_API = "/business/individual/ProfileCompleteness";
// export const PROFILE_COMPLETENESS_CHECKLIST_API = "/business/individual/MasterData"; 