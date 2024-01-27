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

import { getAge /**, getFullName  */ } from "../utils/helper";

export default function BasicInfoCard(props) {
    const {
        firstName, middleName, lastName, gender, dob, bio, photo
    } = props;

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
                    styleClasses={[CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_FLEX_START]}
                >
          
                    <CoreIconText type={__IconTypes.MATERIAL_OUTLINED_ICON} icon="cake" text={getAge(dob)} />

                    <CoreTypographyCaption styleClasses={[CoreClasses.COLOR.TEXT_SECONDARY]}>{" | "}</CoreTypographyCaption>

                    <CoreIconText type={__IconTypes.MATERIAL_OUTLINED_ICON} icon={getGender(gender, true)} text={getGender(gender)} />

                </CoreStack>
            </CoreBox>

            <CoreBox gridProps={{ gridSize: { xs: 12 } }}>
                <CoreTypographyBody1 limitChars={250}>{bio}</CoreTypographyBody1>
            </CoreBox>
        </CoreGrid>
    );
}
