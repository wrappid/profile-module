import {
  CoreAvatar,
  CoreH6,
  CoreTypographyBody1,
  CoreIconButton,
  CoreBox,
  CoreIcon,
  CoreGrid,
  CoreClasses,
  getFullName,
  CoreIconText,
  __IconTypes,
  CoreStack
} from "@wrappid/core";
import { useSelector } from "react-redux";

import { getAge, getDOB } from "../../functions/helper.functions";

export default function BasicInfoCard(props) {
  const {
    firstName, middleName, lastName, gender, dob, bio, photo
  } = props;
  const CustomIconTooltipText = (props) =>{
    return (
      <CoreIconButton
        disableFocusRipple={true}
        disableRipple={true}
        type={__IconTypes.MATERIAL_OUTLINED_ICON}
        title={props?.tip}
        disableElevation={true}
        styleClasses={[CoreClasses.CURSOR.CURSOR_DEFAULT, CoreClasses.PADDING.P0]}
        {...props}>
  
        {props?.icon !== undefined ? 
          <CoreIcon>
            {props?.icon}
          </CoreIcon> : null
        }
  
        {props?.children}
      </CoreIconButton>
    );
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
        : "Unknown";
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
    <CoreGrid styleClasses={[CoreClasses.MARGIN.ML1, CoreClasses.MARGIN.MT_N5]}>
      <CoreBox
        gridProps={{ gridSize: { md: 0.9, xs: 12 } }}
        styleClasses={[CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_CENTER, CoreClasses.BORDER.BORDER_PRIMARY]}
      >
        <CoreAvatar
          styleClasses={[CoreClasses.DATA_DISPLAY.AVATAR_LARGE]}
          src={photo}
        />
      </CoreBox>

      <CoreBox gridProps={{ gridSize: { md: 10, xs: 12 } }} styleClasses={[]}>
        <CoreH6>{getFullName({ firstName, lastName, middleName })}</CoreH6>

        {/* Display degrees */}
        <CoreTypographyBody1>{degrees}</CoreTypographyBody1>

        <CoreStack
          direction="row"
          spacing={1}
          divider={true}
          styleClasses={[CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_FLEX_START]}
        >
          <CustomIconTooltipText
            tip={getDOB(dob)}
            disableFocusRipple={true}
            disableRipple={true}
            type={__IconTypes.MATERIAL_OUTLINED_ICON}
          >
            <CoreIconButton
              type={__IconTypes.MATERIAL_OUTLINED_ICON}
              title=""
              disabled={true}
              disableFocusRipple={true}
            >
              <CoreIconText type={__IconTypes.MATERIAL_OUTLINED_ICON} icon="cake" text={getAge(dob)} />
            </CoreIconButton>
          </CustomIconTooltipText>

          <CoreIconButton
            type={__IconTypes.MATERIAL_OUTLINED_ICON}
            title=""
            disabled={true}
            disableFocusRipple={true} >

            <CoreIconText
              type={__IconTypes.MATERIAL_OUTLINED_ICON}
              icon={getGender(gender, true)}
              text={getGender(gender)}
            />
          </CoreIconButton>

        </CoreStack>
      </CoreBox>

      <CoreBox gridProps={{ gridSize: { xs: 12 } }}>
        <CoreTypographyBody1 limitChars={250}>{bio}</CoreTypographyBody1>
      </CoreBox>
    </CoreGrid>
  );
}
