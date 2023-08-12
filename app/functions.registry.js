import { profileBasicgender, profileRegistrationSpecilization } from "./functions/asyncselect.functions";
import {
  SanBasicEditUrlChange, SanEducationAddUrlChange, SanEducationEditUrlChange, SanEducationReadUrlChange, SanExperienceAddUrlChange, SanExperienceEditUrlChange, SanExperienceReadUrlChange, SanProfileBasicRead, SanProfileClinicRead, SanProfileEducationRead, SanProfileExperienceRead, SanProfileRegistrationRead, SanRegistrationReadUrlChange 
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
      
  SanProfileEducationRead: SanProfileEducationRead,
      
  SanProfileExperienceRead: SanProfileExperienceRead,
      
  SanProfileRegistrationRead: SanProfileRegistrationRead,
      
  SanRegistrationReadUrlChange: SanRegistrationReadUrlChange,
      
  profileBasicgender: profileBasicgender,
      
  profileRegistrationSpecilization: profileRegistrationSpecilization,
};
