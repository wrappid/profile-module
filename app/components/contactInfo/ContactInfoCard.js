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
  CoreEmailLink
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
        <CoreBox gridProps={{ gridSize: { sm: 4 } }} styleClasses={[CoreClasses.FLEX.DIRECTION_COLUMN]}>
            <CoreLabel>Primary Phone</CoreLabel>
            <CorePhoneLink phone={phone} verified={phoneVerified} />
        </CoreBox>

        <CoreBox gridProps={{ gridSize: { sm: 4 } }} styleClasses={[CoreClasses.FLEX.DIRECTION_COLUMN]}>
            <CoreLabel>Primary Email</CoreLabel>
            <CoreEmailLink email={email} verified={emailVerified} />
        </CoreBox>

        <CoreBox gridProps={{ gridSize: { sm: 4 } }} styleClasses={[CoreClasses.FLEX.DIRECTION_COLUMN]}>
            <CoreLabel>Profile Link</CoreLabel>
            <CoreTypographyBody2>
                {profileLink ? profileLink : "Not given"}
            </CoreTypographyBody2>
        </CoreBox>

        <CoreBox gridProps={{ gridSize: { sm: 4 } }} styleClasses={[CoreClasses.FLEX.DIRECTION_COLUMN]}>
            <CoreLabel>Website</CoreLabel>
            <CoreTypographyBody2>
                {website ? website : "Not given"}
            </CoreTypographyBody2>
        </CoreBox>
      </CoreGrid>
    </>
  );
}
