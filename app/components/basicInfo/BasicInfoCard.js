import {
  CoreAvatar,
  CoreH6,
  CoreTypographyBody1,
  CoreTypographyCaption,
  CoreBox,
  CoreGrid,
  CoreClasses,
  getFullName,
  CoreIconText,
  __IconTypes,
  CoreStack
} from "@wrappid/core";
import { useSelector } from "react-redux";

export default function BasicInfoCard(props) {
  const {
    firstName, middleName, lastName, gender, dob, bio, photo
  } = props;
  const getAge = (birthDate)=> {
    let dob = new Date(birthDate);
  
    //extract the year, month, and date from date input
    let dobYear = dob.getYear();
  
    let dobMonth = dob.getMonth();
  
    let dobDate = dob.getDate();
  
    //get the current date from the system
    let now = new Date();
  
    //extract the year, month, and date from current date
    let currentYear = now.getYear();
  
    let currentMonth = now.getMonth();
  
    let currentDate = now.getDate();
  
    //declare a variable to collect the age in year, month, and days
    let age = {};
  
    let dateAge = 0;
  
    let monthAge = 0;
  
    //get years
    let yearAge = currentYear - dobYear;
  
    //get months
    if (currentMonth >= dobMonth) {
      //get months when current month is greater
      monthAge = currentMonth - dobMonth;
    } else {
      yearAge--;
      monthAge = 12 + currentMonth - dobMonth;
    }
  
    //get days
    if (currentDate >= dobDate) {
      //get days when the current date is greater
      dateAge = currentDate - dobDate;
    } else {
      monthAge--;
      dateAge = 31 + currentDate - dobDate;
  
      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }
    //group the age in a single variable
    age = {
      days  : dateAge,
      months: monthAge,
      years : yearAge,
    };
  
    let ageString = "";
  
    if (age.years > 0) {
      ageString = age.years + " year";
      if (age.years > 0) {
        ageString += "s";
      }
    }
    if (age.months > 0) {
      if (ageString) ageString += ", ";
      ageString += age.months + " month";
      if (age.months > 1) {
        ageString += "s";
      }
    }
  
    //show days only if year is 0 (zero)
    if (age.years > 0 === false) {
      if (age.days > 0) {
        if (ageString) ageString += ", ";
        ageString += age.days + " day";
        if (age.days > 1) {
          ageString += "s";
        }
      }
    }
    //return the calculated age
    return ageString && ageString.length > 0 ? ageString : "N/A";
  };

  const getGender = (gender, iconFlag = false) => {
    let genderTmp = "unknown";

    if (typeof gender === "string") {
      genderTmp = gender.toLowerCase();
    } else if (typeof gender === "object") {
      genderTmp = (gender?.id || gender?.label || "unknown").toLowerCase();
    } else {
      genderTmp = "unknown";
    }

    if (!iconFlag) {
      return genderTmp && genderTmp.trim() !== ""
        ? genderTmp
          .replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })
        : "N/A";
    }

    switch (genderTmp) {
      case "male":
        return "male";

      case "female":
        return "female";

      default:
        return "question_mark";
    }
  };

  const degrees = useSelector((state) => state?.profile?.registration?.degrees);

  return (
    <CoreGrid styleClasses={[CoreClasses.ALIGNMENT.ALIGN_ITEMS_CENTER]}>
      <CoreBox
        gridProps={{ gridSize: { md: 2, xs: 12 } }}
        styleClasses={[CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_CENTER]}
      >
        <CoreAvatar
          styleClasses={[CoreClasses.DATA_DISPLAY.AVATAR_XLARGE]}
          src={photo}
        />
      </CoreBox>

      <CoreBox gridProps={{ gridSize: { md: 10, xs: 12 } }}>
        <CoreH6 styleClasses={[CoreClasses.COLOR.TEXT_BLACK_50]}>{getFullName({ firstName, lastName, middleName })}</CoreH6>

        {/* Display degrees */}
        <CoreTypographyBody1>{degrees}</CoreTypographyBody1>

        <CoreStack
          direction="row"
          spacing={1}
          styleClasses={[CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_FLEX_START, CoreClasses.ALIGNMENT.ALIGN_ITEMS_CENTER]}
        >
          
          <CoreBox styleClasses={[CoreClasses.COLOR.TEXT_SECONDARY]}>
            <CoreIconText
              type={__IconTypes.MATERIAL_OUTLINED_ICON}
              icon="cake"
              text={
                <CoreBox styleClasses={[CoreClasses.COLOR.TEXT_BLACK_50]}>
                  {getAge(dob)}  
                </CoreBox>
              } />
          </CoreBox>

          <CoreTypographyCaption styleClasses={[CoreClasses.COLOR.TEXT_SECONDARY]}>{" | "}</CoreTypographyCaption>

          <CoreBox styleClasses={[CoreClasses.COLOR.TEXT_SECONDARY]}>
            <CoreIconText 
              type={__IconTypes.MATERIAL_OUTLINED_ICON} 
              icon={getGender(gender, true)} 
              text={
                <CoreBox styleClasses={[CoreClasses.COLOR.TEXT_BLACK_50]}>
                  {getGender(gender)}  
                </CoreBox>
              } />
          </CoreBox>

        </CoreStack>
      </CoreBox>

      <CoreBox gridProps={{ gridSize: { xs: 12 } }}>
        <CoreTypographyBody1 limitChars={250}>{bio}</CoreTypographyBody1>
      </CoreBox>
    </CoreGrid>
  );
}
