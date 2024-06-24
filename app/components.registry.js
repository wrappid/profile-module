import BasicInfoCard from "./components/basicInfo/BasicInfoCard";
import ProfileBasicSkeleton from "./components/basicInfo/ProfileBasicSkeleton";
import ContactInfoCard from "./components/contactInfo/ContactInfoCard";
import ProfileContactSkeleton from "./components/contactInfo/ProfileContactSkeleton";
import EducationCard from "./components/education/EducationCard";
import ProfileEducationSkeleton from "./components/education/ProfileEducationSkeleton";
import ExperienceCard from "./components/experience/ExperienceCard";
import ProfileExperienceSkeleton from "./components/experience/ProfileExperienceSkeleton";
import UserProfile from "./components/UserProfile";

export const ComponentsRegistry = {
  BasicInfoCard            : { comp: BasicInfoCard },
  ProfileBasicSkeleton     : { comp: ProfileBasicSkeleton },
  ProfileContactSkeleton   : { comp: ProfileContactSkeleton },
  ProfileEducationSkeleton : { comp: ProfileEducationSkeleton },
  ProfileExperienceSkeleton: { comp: ProfileExperienceSkeleton },
  UserProfile              : { comp: UserProfile },
  contactInfoCard          : { comp: ContactInfoCard },
  educationCard            : { comp: EducationCard },
  experienceCard           : { comp: ExperienceCard },
};
