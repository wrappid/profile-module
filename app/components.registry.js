import BasicInfoCard from "./components/basicInfo/BasicInfoCard";
import ProfileBasicSkeleton from "./components/basicInfo/ProfileBasicSkeleton";
import clinicCard from "./components/clinic/ClinicCard";
import ProfileClinicSkeleton from "./components/clinic/ProfileClinicSkeleton";
import contactInfoCard from "./components/contactInfo/ContactInfoCard";
import ProfileContactSkeleton from "./components/contactInfo/ProfileContactSkeleton";
import educationCard from "./components/education/EducationCard";
import ProfileEducationSkeleton from "./components/education/ProfileEducationSkeleton";
import experienceCard from "./components/experience/ExperienceCard";
import ProfileExperienceSkeleton from "./components/experience/ProfileExperienceSkeleton";
import registrationCard from "./components/registration/RegistrationCard";
import ProfileRegistrationCard from "./components/registration/ProfileRegistrationSkeleton";
import UserProfile from "./components/UserProfile";

export const ComponentRegistry = {
    BasicInfoCard: {
    comp: BasicInfoCard,
  },
  ProfileBasicSkeleton: {
    comp: ProfileBasicSkeleton,
  },
  clinicCard: {
    comp: clinicCard,
  },
  ProfileClinicSkeleton: {
    comp: ProfileClinicSkeleton,
  },
  contactInfoCard: {
    comp: contactInfoCard,
  },
  ProfileContactSkeleton: {
    comp: ProfileContactSkeleton,
  },
  educationCard: {
    comp: educationCard,
  },
  ProfileEducationSkeleton: {
    comp: ProfileEducationSkeleton,
  },
  experienceCard: {
    comp: experienceCard,
  },
  ProfileExperienceSkeleton: {
    comp: ProfileExperienceSkeleton,
  },
  registrationCard: {
    comp: registrationCard,
  },
  ProfileRegistrationCard: {
    comp: ProfileRegistrationCard,
  },
  UserProfile: {
    comp: UserProfile,
  },
};
