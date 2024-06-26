import {
  CoreIcon,
  CoreLabel,
  CoreTypographyBody1,
  CoreIconButton,
  CoreBox,
  CoreGrid,
  CoreClasses,
  coreUseNavigate,
  CorePhoneLink,
  CoreEmailLink
} from "@wrappid/core";
import { useSelector } from "react-redux";

export default function ContactInfoCard(props) {
  const navigate = coreUseNavigate();
  const contactInfo = useSelector((state) => state.profile.contact);
  const { phoneVerified, emailVerified } = contactInfo;
  // eslint-disable-next-line no-unused-vars
  const { phone, email, profileLink, website } = props;

  return (

    <>
      <CoreBox styleClasses={[CoreClasses.DISPLAY.FLEX, CoreClasses.ALIGNMENT.ALIGN_ITEMS_CENTER, CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_SPACE_BETWEEN]}>
        <CoreTypographyBody1
          styleClasses={[CoreClasses.TEXT.TEXT_WEIGHT_BOLD]}
        >Contact Info</CoreTypographyBody1>

        <CoreIconButton
          title={"Edit Contact Info"}
          onClick={() => {
            navigate("/settings#account");
          }}
          styleClasses={[CoreClasses.PADDING.PR0]}
        >
          <CoreIcon>edit_note</CoreIcon>
        </CoreIconButton>
      
      </CoreBox>

      <CoreGrid styleClasses={[CoreClasses.PADDING.PL0]}>
        <CoreBox
          gridProps={{ gridSize: { sm: 3 } }}
          styleClasses={[CoreClasses.FLEX.DIRECTION_COLUMN]}
        >
          <CoreLabel>Primary Phone</CoreLabel>

          <CorePhoneLink icon="phone" phone={phone} verified={phoneVerified} />
        </CoreBox>

        <CoreBox
          gridProps={{ gridSize: { sm: 3 } }}
          styleClasses={[CoreClasses.FLEX.DIRECTION_COLUMN]}
        >
          <CoreLabel>Primary Email</CoreLabel>

          <CoreEmailLink email={email} verified={emailVerified} />
        </CoreBox>

        {/**
         * @todo Removing as of now for quick release
         */}
        {/* -- <CoreBox
          gridProps={{ gridSize: { sm: 3 } }}
          styleClasses={[CoreClasses.FLEX.DIRECTION_COLUMN]}
        >
          <CoreLabel>Profile Link</CoreLabel>

          <CoreStack direction="row" spacing={1}>
            <CoreIcon
              styleClasses={[profileLink ? CoreClasses.COLOR.TEXT_PRIMARY : CoreClasses.COLOR.TEXT_SECONDARY_DARK]}
            >
            link
            </CoreIcon>

            <CoreTypographyBody2>
              {profileLink ? profileLink : "Not given"}
            </CoreTypographyBody2>
          </CoreStack>
        </CoreBox>

        <CoreBox
          gridProps={{ gridSize: { sm: 3 } }}
          styleClasses={[CoreClasses.FLEX.DIRECTION_COLUMN]}
        >
          <CoreLabel>Website</CoreLabel>

          <CoreStack direction="row" spacing={1}>
            <CoreIcon
              styleClasses={[website ? CoreClasses.COLOR.TEXT_PRIMARY : CoreClasses.COLOR.TEXT_SECONDARY_DARK]}
            >
            language
            </CoreIcon>

            <CoreTypographyBody2>
              {website ? website : "Not given"}
            </CoreTypographyBody2>
          </CoreStack>
        </CoreBox> */}
      </CoreGrid>
    </>
  );
}
