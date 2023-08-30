import {
  CoreIcon,
  CoreLabel,
  CoreTypographyBody1,
  CoreTypographyBody2,
  CoreIconButton,
  CoreBox,
  CoreGrid,
  CoreCardHeader,
  CoreClasses,
  coreUseNavigate,
  CorePhoneLink,
  CoreEmailLink,
  CoreStack
} from "@wrappid/core";
import { useSelector } from "react-redux";

export default function ContactInfoCard(props) {
  const navigate = coreUseNavigate();
  const contactInfo = useSelector((state) => state.profile.contact);
  const { phoneVerified, emailVerified } = contactInfo;
  const { phone, email, profileLink, website } = props;

  return (
    <>
      <CoreCardHeader
        styleClasses={[CoreClasses.PADDING.P0, CoreClasses.PADDING.PR1]}
        title={
          <CoreTypographyBody1
            styleClasses={[CoreClasses.TEXT.TEXT_WEIGHT_BOLD]}
          >
            Contact Info
          </CoreTypographyBody1>
        }
        action={
          <CoreIconButton
            title={"Edit Contact Info"}
            onClick={() => {
              navigate("/settings#account");
            }}
          >
            <CoreIcon>edit_note</CoreIcon>
          </CoreIconButton>
        }
      />

      <CoreGrid>
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
