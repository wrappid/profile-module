import {
  CoreAvatar,
  CoreH6,
  CoreTypographyBody1,
  CoreTypographySubtitle1,
  CoreBox,
  CoreGrid,
  CoreClasses,
  getFullName,
  CoreIconText,
  __IconTypes,
  CoreStack,
  CoreDivider
} from "@wrappid/core";

import { getAge /**, getFullName  */ } from "../utils/helper";
import { useSelector } from "react-redux";


export default function BasicInfoCard(props) {
  const {
    firstName, middleName, lastName, gender, dob, bio, photo
  } = props;
  //getGender is not showing proper icon, its need to be code properly
  const getGender = (gender) => {
    if (typeof gender === 'string') {
      switch (gender.toLowerCase()) {
        case 'male':
          return 'male';
        case 'female':
          return 'female';
        default:
          return 'question_mark';
      }
    } else if (typeof gender === 'object' && gender.label) {
      return gender.label;
    } else {
      return 'question_mark';
    }
  };

  const degrees = useSelector((state) => state?.profile?.registration?.degrees);


  return (
    <CoreGrid styleClasses={[]}>
      <CoreBox
        gridProps={{ gridSize: { md: 2, xs: 12 } }}
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
        >
          <CoreTypographySubtitle1 styleClasses={[CoreClasses.COLOR.TEXT_BLACK]}>
            <CoreIconText type={__IconTypes.MATERIAL_OUTLINED_ICON} icon="cake" text={getAge(dob)} />
          </CoreTypographySubtitle1>

          <CoreDivider variant="verticle" />

          <CoreTypographySubtitle1 styleClasses={[CoreClasses.COLOR.TEXT_BLACK]}>
            <CoreIconText type={__IconTypes.MATERIAL_OUTLINED_ICON} icon={getGender(gender)} text={getGender(gender)} />
          </CoreTypographySubtitle1>

        </CoreStack>
      </CoreBox>

      <CoreBox gridProps={{ gridSize: { xs: 12 } }}>
        <CoreTypographyBody1 limitChars={250}>{bio}</CoreTypographyBody1>
      </CoreBox>
    </CoreGrid>
  );
}
