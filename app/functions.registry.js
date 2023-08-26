import { profileBasicgender, profileRegistrationSpecilization } from "./functions/asyncselect.functions";
import { getCity, getDistrict, getState } from "./functions/form.dependency.function";
import {
  SanBasicEditUrlChange, SanClinicAddUrlChange, SanClinicDeleteUrlChange, SanClinicEditUrlChange, SanClinicReadUrlChange, SanEducationAddUrlChange, SanEducationEditUrlChange, SanEducationReadUrlChange, SanExperienceAddUrlChange, SanExperienceEditUrlChange, SanExperienceReadUrlChange, SanProfileBasicRead, SanProfileClinicRead, SanProfileEducationRead, SanProfileExperienceRead, SanProfileRegistrationRead, SanRegistrationReadUrlChange 
} from "./functions/sanity.functions";

// asyncSelect and formSubmitSanitization

export const FunctionsRegistry = {
  SanBasicEditUrlChange   : SanBasicEditUrlChange,
  SanEducationAddUrlChange: SanEducationAddUrlChange,
  
  SanEducationEditUrlChange: SanEducationEditUrlChange,
  
  SanEducationReadUrlChange: SanEducationReadUrlChange,
    
  //PROFILE EXP SANITIZATION FUNCTIONS
  SanExperienceAddUrlChange: SanExperienceAddUrlChange,
  
  SanExperienceEditUrlChange: SanExperienceEditUrlChange,
  
  SanExperienceReadUrlChange: SanExperienceReadUrlChange,
    
  SanProfileBasicRead: SanProfileBasicRead,
    
  SanProfileClinicRead: SanProfileClinicRead,
  SanClinicAddUrlChange: SanClinicAddUrlChange,
  SanClinicEditUrlChange: SanClinicEditUrlChange,
  SanClinicDeleteUrlChange: SanClinicDeleteUrlChange,
  SanClinicReadUrlChange: SanClinicReadUrlChange,
      
  SanProfileEducationRead: SanProfileEducationRead,
      
  SanProfileExperienceRead: SanProfileExperienceRead,
      
  SanProfileRegistrationRead: SanProfileRegistrationRead,
      
  SanRegistrationReadUrlChange: SanRegistrationReadUrlChange,
      
  profileBasicgender: profileBasicgender,
      
  profileRegistrationSpecilization: profileRegistrationSpecilization,

  
  getState:getState ,
  
  getDistrict:getDistrict ,
  
  getCity:getCity
  
};
