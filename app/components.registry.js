import BasicInfoCard from "./components/basicInfo/BasicInfoCard";
import ProfileBasicSkeleton from "./components/basicInfo/ProfileBasicSkeleton";
import clinicCard from "./components/clinic/ClinicCard";
import ProfileClinicSkeleton from "./components/clinic/ProfileClinicSkeleton";
import ContactInfoCard from "./components/contactInfo/ContactInfoCard";
import ProfileContactSkeleton from "./components/contactInfo/ProfileContactSkeleton";
import educationCard from "./components/education/EducationCard";
import ProfileEducationSkeleton from "./components/education/ProfileEducationSkeleton";
import experienceCard from "./components/experience/ExperienceCard";
import ProfileExperienceSkeleton from "./components/experience/ProfileExperienceSkeleton";
import ProfileRegistrationCard from "./components/registration/ProfileRegistrationSkeleton";
import registrationCard from "./components/registration/RegistrationCard";
import UserProfile from "./components/UserProfile";

export const ComponentRegistry = {
  BasicInfoCard            : { comp: BasicInfoCard },
  ProfileBasicSkeleton     : { comp: ProfileBasicSkeleton },
  ProfileClinicSkeleton    : { comp: ProfileClinicSkeleton },
  ProfileContactSkeleton   : { comp: ProfileContactSkeleton },
  ProfileEducationSkeleton : { comp: ProfileEducationSkeleton },
  ProfileExperienceSkeleton: { comp: ProfileExperienceSkeleton },
  ProfileRegistrationCard  : { comp: ProfileRegistrationCard },
  UserProfile              : { comp: UserProfile },
  clinicCard               : { comp: clinicCard },
  contactInfoCard          : { comp: ContactInfoCard },
  educationCard            : { comp: educationCard },
  experienceCard           : { comp: experienceCard },
  registrationCard         : { comp: registrationCard },
};
