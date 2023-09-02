import { masterDataMap, profileRegistrationSpecilization } from "./functions/asyncselect.functions";
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
      
  __PROFILEBASICGENDER_GET_OPTION_LABEL         : masterDataMap.getOptionLabel,
  __PROFILEBASICGENDER_GET_OPTION_VALUE         : masterDataMap.getOptionValue,
  __PROFILEBASICGENDER_IS_OPTIONS_EQUAL_TO_VALUE: masterDataMap.isOptionEqualToValue,
      
  getCity: getCity,
  
  getDistrict: getDistrict,
  
  getState: getState,
  
  profileRegistrationSpecilization: profileRegistrationSpecilization
  
};
