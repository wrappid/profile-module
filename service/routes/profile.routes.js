const express = require("express");

const profileController = require("../controllers/profile.controller");



const profileRouter = express.Router();

profileRouter.get("/rx/registrationInfo", profileController.getRegistrationInfo);


module.exports = profileRouter;




// Following apis are present in business module

// export const GET_PROFILE_BASIC_API = "/business/individual/ProfileBasic";
// export const GET_PROFILE_CLINIC_API = "/business/all/ProfileClinic";
// export const GET_PROFILE_EDUCATION_API = "/business/all/ProfileEducation";
// export const GET_PROFILE_EXPERIENCE_API = "/business/all/ProfileExperience";

// export const PROFILE_COMPLETENESS_API = "/business/individual/ProfileCompleteness";
// export const PROFILE_COMPLETENESS_CHECKLIST_API = "/business/individual/MasterData"; 