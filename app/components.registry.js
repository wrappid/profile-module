import BasicInfoCard from "./components/basicInfo/BasicInfoCard";
import ProfileBasicSkeleton from "./components/basicInfo/ProfileBasicSkeleton";
import ClinicCard from "./components/clinic/ClinicCard";
import ProfileClinicSkeleton from "./components/clinic/ProfileClinicSkeleton";
import ContactInfoCard from "./components/contactInfo/ContactInfoCard";
import ProfileContactSkeleton from "./components/contactInfo/ProfileContactSkeleton";
import EducationCard from "./components/education/EducationCard";
import ProfileEducationSkeleton from "./components/education/ProfileEducationSkeleton";
import ExperienceCard from "./components/experience/ExperienceCard";
import ProfileExperienceSkeleton from "./components/experience/ProfileExperienceSkeleton";
import ProfileRegistrationSkeleton from "./components/registration/ProfileRegistrationSkeleton";
import RegistrationCard from "./components/registration/RegistrationCard";
import UserProfile from "./components/UserProfile";

export const ComponentsRegistry = {
  BasicInfoCard              : { comp: BasicInfoCard },
  ProfileBasicSkeleton       : { comp: ProfileBasicSkeleton },
  ProfileClinicSkeleton      : { comp: ProfileClinicSkeleton },
  ProfileContactSkeleton     : { comp: ProfileContactSkeleton },
  ProfileEducationSkeleton   : { comp: ProfileEducationSkeleton },
  ProfileExperienceSkeleton  : { comp: ProfileExperienceSkeleton },
  ProfileRegistrationSkeleton: { comp: ProfileRegistrationSkeleton },
  UserProfile                : { comp: UserProfile },
  clinicCard                 : { comp: ClinicCard },
  contactInfoCard            : { comp: ContactInfoCard },
  educationCard              : { comp: EducationCard },
  experienceCard             : { comp: ExperienceCard },
  registrationCard           : { comp: RegistrationCard }
};
