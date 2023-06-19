import {
  CoreIcon,
  CoreLabel,
  CoreTypographyBody1,
  CoreTypographyCaption,
  CoreIconButton,
  CoreBox,
  CoreGrid,
  CoreCardHeader,
  CoreClasses,
} from "@wrappid/core";

import { coreUseNavigate } from "@wrappid/core";

export default function contactInfoCard(props) {
  const navigate = coreUseNavigate();
  // -- const contactInfo = useSelector((state) => state.profile.contact);
  // -- const { phone, email, phoneVerified, emailVerified } = contactInfo;
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
              // -- navigate("/settings#account");
            }}
          >
            <CoreIcon>edit_note</CoreIcon>
          </CoreIconButton>
        }
      />

      <CoreGrid>
        <CoreBox gridProps={{ gridSize: { sm: 4 } }} styleClasses={[CoreClasses.FLEX.DIRECTION_COLUMN]}>
        <CoreLabel>Primary Phone</CoreLabel>
        <CoreTypographyCaption>
          {phone ? phone : "Not given"}
        </CoreTypographyCaption>

        {/* -- <RxPhoneLink phone={phone} verified={phoneVerified} /> */}
        </CoreBox>

        <CoreBox gridProps={{ gridSize: { sm: 4 } }} styleClasses={[CoreClasses.FLEX.DIRECTION_COLUMN]}>
        <CoreLabel>Primary Email</CoreLabel>
        <CoreTypographyCaption>
          {email ? email : "Not given"}
        </CoreTypographyCaption>

        {/* -- <RxEmailLink email={email} verified={emailVerified} /> */}
        </CoreBox>

        <CoreBox gridProps={{ gridSize: { sm: 4 } }} styleClasses={[CoreClasses.FLEX.DIRECTION_COLUMN]}>
        <CoreLabel>Profile Link</CoreLabel>
        <CoreTypographyCaption>
          {profileLink ? profileLink : "Not given"}
        </CoreTypographyCaption>

        </CoreBox>

        <CoreBox gridProps={{ gridSize: { sm: 4 } }} styleClasses={[CoreClasses.FLEX.DIRECTION_COLUMN]}>
        <CoreLabel>Website</CoreLabel>
        <CoreTypographyCaption>
          {website ? website : "Not given"}
        </CoreTypographyCaption>

        {/* -- <RxEmailLink email={email} verified={emailVerified} /> */}
        </CoreBox>

        {/* -- {profile && (
                    <CoreBox gridProps={{ gridSize: 3 }}>
                    <CoreTypographyBody1>Profile</CoreTypographyBody1>
                    <CoreTypographyBody1>{profile}</CoreTypographyBody1>
                    </CoreBox>
                )}
                {website && (
                    <CoreBox gridProps={{ gridSize: 3 }}>
                    <CoreTypographyBody1>Website</CoreTypographyBody1>
                    <CoreTypographyBody1>{website}</CoreTypographyBody1>
                    </CoreBox>
                )} */}
      </CoreGrid>
    </>
  );
}
