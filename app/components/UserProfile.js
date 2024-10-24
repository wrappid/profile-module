/* eslint-disable etc/no-commented-out-code */
import { useState, useEffect } from "react";

import {
  AppContainerLayout,
  CoreBox,
  CoreCard,
  CoreCardContent,
  CoreClasses,
  CoreComponent,
  CoreDivider,
  CoreForm,
  CoreGrid,
  CoreLayoutItem,
  FORM_EDIT_MODE,
  FORM_IDS,
  FORM_VIEW_MODE
} from "@wrappid/core";
import { useSelector } from "react-redux";

// -- import RssFeed from "../utility/RssFeed";

function UserProfile() {
  const [formsMode, setFormsMode] = useState({
    [FORM_IDS.__PROFILE_BASIC]       : FORM_VIEW_MODE,
    [FORM_IDS.__PROFILE_CONTACT]     : FORM_VIEW_MODE,
    [FORM_IDS.__PROFILE_CLINIC]      : FORM_VIEW_MODE,
    [FORM_IDS.__PROFILE_REGISTRATION]: FORM_VIEW_MODE,
    [FORM_IDS.__PROFILE_EDUCATION]   : FORM_VIEW_MODE,
    [FORM_IDS.__PROFILE_EXPERIENCE]  : FORM_VIEW_MODE,
  });

  const profile = useSelector((state) => state.profile); // --- profile, addresses, basic, contact, educations, experiences, registration
  const auth = useSelector((state) => state.auth); // --- auth, navData
  const state = useSelector((state) => state); // --- auth, navData

  // eslint-disable-next-line no-console
  console.log("STATE", state);

  // --- componentDidMount
  useEffect(() => {}, []);

  // eslint-disable-next-line no-unused-vars
  const ToggleMode = (formId) => {
    setFormsMode({
      ...formsMode,
      [formId]:
        formsMode[formId] === FORM_VIEW_MODE ? FORM_EDIT_MODE : FORM_VIEW_MODE,
    });
  };

  return (
    <>
      <CoreLayoutItem id={AppContainerLayout.PLACEHOLDER.CONTENT}>
        <CoreGrid>
          <CoreCard gridProps={{ gridSize: { sm: 12 } }} styleClasses={[CoreClasses.PADDING.P1]}>
            <CoreCardContent>
              <CoreGrid columnSpacing={6} coreId="userProfileGrid">
                <CoreForm
                  coreId="basicInfo"
                  allowDelete={false}
                  formId={FORM_IDS.__PROFILE_BASIC}
                  mode={formsMode[FORM_IDS.__PROFILE_BASIC]}
                  query={{
                    _defaultFilter: encodeURIComponent(
                      JSON.stringify({ userId: auth?.uid })
                    ),
                  }}
                />

                <CoreDivider />

                <CoreForm
                  coreId="contactInfo"
                  allowDelete={false}
                  allowEdit={false}
                  formId={FORM_IDS.__PROFILE_CONTACT}
                  notEditable={true}
                />

                <CoreDivider />

                <CoreBox>
                  <CoreComponent
                    componentName="AppSpecificProfileSection" />
                </CoreBox>

                <CoreForm
                  styleClasses={[CoreClasses.PADDING.PR1]}
                  arrayView={true}
                  coreId="educationInfo"
                  formId={FORM_IDS.__PROFILE_EDUCATION}
                  gridProps={{
                    gridSize: {
                      sm: 6,
                      xs: 12,
                    },
                  }}
                  mode={formsMode[FORM_IDS.__PROFILE_EDUCATION]}
                  arrayDataLimit={2}
                  query={{
                    _defaultFilter: encodeURIComponent(
                      JSON.stringify({ personId: profile?.basic?.id })
                    ),
                  }}
                />
                
                <CoreForm
                  styleClasses={[CoreClasses.PADDING.PR1]}
                  arrayView={true}
                  coreId="experienceInfo"
                  formId={FORM_IDS.__PROFILE_EXPERIENCE}
                  gridProps={{
                    gridSize: {
                      sm: 6,
                      xs: 12,
                    },
                  }}
                  mode={formsMode[FORM_IDS.__PROFILE_EXPERIENCE]}
                  arrayDataLimit={2}
                  query={{
                    _defaultFilter: encodeURIComponent(
                      JSON.stringify({ personId: profile?.basic?.id })
                    ),
                  }}
                  // --- afterCreateError={() => {
                  //   alert("CREATE error hook");
                  // }}
                  // afterEditError={() => {
                  //   alert("EDIT error hook");
                  // }}
                  // afterDeleteError={() => {
                  //   alert("DELETE error hook");
                  // }}
                  // afterCreateSuccess={() => {
                  //   alert("CREATE success hook");
                  // }}
                  // afterEditSuccess={() => {
                  //   alert("EDIT success hook");
                  // }}
                  // afterDeleteSuccess={() => {
                  //   alert("DELETE success hook");
                  // }}
                />
                
                {/* <CoreForm
                  arrayView={true}
                  formId={FORM_IDS.__CREATE_PATIENT}
                  gridProps={{
                    gridSize: {
                      sm: 6,
                      xs: 12,
                    },
                  }}
                  mode={FORM_VIEW_MODE}
                /> */}
              </CoreGrid>
            </CoreCardContent>
          </CoreCard>

          {/* -- <CoreCard gridProps={{ gridSize: { sm: 4 } }}>
            <CoreCardContent><RssFeed /></CoreCardContent>
          </CoreCard> */}
        </CoreGrid>
      </CoreLayoutItem>
    </>
  );
}

export default UserProfile;
