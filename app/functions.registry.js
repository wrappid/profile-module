import { profileRegistrationSpecilization } from "./functions/asyncselect.functions";
import { getCity, getDistrict, getState } from "./functions/form.dependency.function";
import {
    SanBasicEditUrlChange, SanClinicAddUrlChange, SanClinicDeleteUrlChange, SanClinicEditUrlChange, SanClinicReadUrlChange, SanEducationAddUrlChange, SanEducationEditUrlChange, SanEducationReadUrlChange, SanExperienceAddUrlChange, SanExperienceEditUrlChange, SanExperienceReadUrlChange, SanProfileBasicRead, SanProfileClinicRead, SanProfileEducationRead, SanProfileExperienceRead, SanProfileRegistrationRead, SanRegistrationReadUrlChange 
} from "./functions/sanity.functions";

// asyncSelect and formSubmitSanitization

export const FunctionsRegistry = {
    SanBasicEditUrlChange: SanBasicEditUrlChange,
    SanClinicAddUrlChange: SanClinicAddUrlChange,
  
    SanClinicDeleteUrlChange: SanClinicDeleteUrlChange,
  
    SanClinicEditUrlChange: SanClinicEditUrlChange,
  
    SanClinicReadUrlChange: SanClinicReadUrlChange,
  
    SanEducationAddUrlChange: SanEducationAddUrlChange,
  
    SanEducationEditUrlChange: SanEducationEditUrlChange,
  
    SanEducationReadUrlChange: SanEducationReadUrlChange,
    
    //PROFILE EXP SANITIZATION FUNCTIONS
    SanExperienceAddUrlChange : SanExperienceAddUrlChange,
    SanExperienceEditUrlChange: SanExperienceEditUrlChange,
    SanExperienceReadUrlChange: SanExperienceReadUrlChange,
    SanProfileBasicRead       : SanProfileBasicRead,
    SanProfileClinicRead      : SanProfileClinicRead,
      
    SanProfileEducationRead: SanProfileEducationRead,
      
    SanProfileExperienceRead: SanProfileExperienceRead,
      
    SanProfileRegistrationRead: SanProfileRegistrationRead,
      
    SanRegistrationReadUrlChange: SanRegistrationReadUrlChange,
      
    getCity: getCity,
  
    getDepartmentsValue: profileRegistrationSpecilization.getOptionValue,
  
    getDistrict: getDistrict,
  
    getState: getState
  
};
