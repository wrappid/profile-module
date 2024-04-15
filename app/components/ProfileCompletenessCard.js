import React from "react";

import {
  HTTP,
  apiRequestAction,
  coreUseNavigate,
  CoreClasses,
  CoreChip,
  CoreDivider,
  CoreIcon,
  CoreTypographyBody2,
  CoreCircularProgress,
  CoreContainedButton,
  CoreIconButton,
  CoreBox,
  CoreCard,
  CoreCardContent,
  CoreCardHeader,
  WEB_PLATFORM,
  detectPlatform,
  CoreAvatar
} from "@wrappid/core";
import { useDispatch, useSelector } from "react-redux";

import { ApiRegistry } from "../apis.registry";
import { RoutesRegistry } from "../routes.registry";
import {
  PROFILE_COMPLETENESS_CHECKLIST_ERROR,
  PROFILE_COMPLETENESS_CHECKLIST_SUCCESS,
  PROFILE_COMPLETENESS_ERROR,
  PROFILE_COMPLETENESS_RELOAD,
  PROFILE_COMPLETENESS_REPORT_UPDATE,
  PROFILE_COMPLETENESS_SUCCESS
} from "../types/profileTypes";
// -- import { getLabel } from "../../utils/stringUtils";

export const PROFILE_COMPLETENESS = "pc_";

export default function ProfileCompletenessCard() {
  const dispatch = useDispatch();
  const navigate = coreUseNavigate();
  const auth = useSelector((state) => state.auth);
  const { uid = undefined, role } = auth;
  const { completeness } = useSelector((state) => state.profile);
  const {
    reload = true,
    success = false,
    error = false,
    checklist,
    data,
    report = {
      missingData : {},
      providedData: {},
      quotient    : 0
    }
  } = completeness || {};

  const [cardOpen, setCardOpen] = React.useState(true);

  // platform detection
  // eslint-disable-next-line no-unused-vars
  const [platform, setPlatform] = React.useState(WEB_PLATFORM);

  React.useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  React.useEffect(() => {
    if (!checklist || Object.keys(checklist)?.length === 0) {
      dispatch(
        apiRequestAction(
          HTTP.GET,
          ApiRegistry.PROFILE_COMPLETENESS_CHECKLIST_API,
          true,
          {
            _defaultFilter: encodeURIComponent(
              JSON.stringify({ name: PROFILE_COMPLETENESS + role?.role })
            )
          },
          PROFILE_COMPLETENESS_CHECKLIST_SUCCESS,
          PROFILE_COMPLETENESS_CHECKLIST_ERROR
        )
      );
    }
  }, [role]);

  const getProfileData = () => {
    if (
      success &&
      checklist &&
      Object.keys(checklist)?.length > 0 &&
      uid &&
      uid > 0
    ) {
      dispatch(
        apiRequestAction(
          HTTP.GET,
          ApiRegistry.PROFILE_COMPLETENESS_API,
          true,
          { _defaultFilter: encodeURIComponent(JSON.stringify({ id: uid })) },
          PROFILE_COMPLETENESS_SUCCESS,
          PROFILE_COMPLETENESS_ERROR
        )
      );
    }
  };

  React.useEffect(() => {
    if (success && checklist) {
      dispatch({ type: PROFILE_COMPLETENESS_RELOAD });
    }
  }, []);

  React.useEffect(() => {
    getProfileData();
  }, [checklist, reload]);

  React.useEffect(() => {
    if (
      success &&
      checklist &&
      Object.keys(checklist)?.length > 0 &&
      data &&
      Object.keys(data)?.length > 0
    ) {
      let completenessQuotient = 0;

      let missingData = {};

      let providedData = {};

      if (success) {
        // api call success
        if (checklist && Object.keys(checklist)?.length > 0) {
          if (Object.keys(data)?.length > 0) {
            Object.keys(checklist)?.forEach((checklistKey) => {
              let exist = Object.keys(data)?.filter((key) => {
                return key?.endsWith(checklistKey) && data[key];
              })[0];

              if (exist) {
                completenessQuotient += checklist[checklistKey];
                providedData[checklistKey] = checklist[checklistKey];
              } else {
                missingData[checklistKey] = checklist[checklistKey];
              }
            });
          }
        }
        if (report?.quotient !== completenessQuotient) {
          // update profile completeness report
          dispatch({
            payload: {
              missingData : { ...missingData },
              providedData: { ...providedData },
              quotient    : completenessQuotient
            },
            type: PROFILE_COMPLETENESS_REPORT_UPDATE
          });
        }

        if (completenessQuotient === 100) {
          setCardOpen(false);
        }
      } else if (error) {
        // api call failure
      }
    }
  }, [completeness]);

  return (
    <>
      {cardOpen && !(completeness?.report?.quotient === 100) && (
        <CoreCard>
          <CoreCardHeader
            avatar={
              <CoreCircularProgress
                variant="determinate"
                value={report?.quotient}
                // size={100}
              />
            }
            title="Setup your Rxefy account"
            subheader="You still have information missing on your profile"
            action={
              <CoreIconButton
                onClick={() => {
                  setCardOpen(false);
                }}
              >
                <CoreIcon>clear</CoreIcon>
              </CoreIconButton>
            }
          />

          <CoreDivider />

          <CoreCardContent>
            <CoreTypographyBody2 styleClasses={[CoreClasses.MARGIN.MB2]}>
              Missing Information:
            </CoreTypographyBody2>

            {Object.keys(report?.missingData)?.map((data, index) => {
              return (
                <CoreBox
                  key={`missingData-${index}`}
                  styleClasses={[
                    // --- CoreClasses.DISPLAY.INLINE_BLOCK,
                    CoreClasses.MARGIN.M1
                  ]}
                >
                  <CoreChip
                    avatar={
                      <CoreAvatar
                        styleClasses={[CoreClasses.COLOR.TEXT_WHITE, CoreClasses.BG.BG_ERROR]}
                        label={report?.missingData[data]}
                      />
                    }
                    label={data}
                    size="small"
                  />
                </CoreBox>
              );
            })}

            <CoreDivider />

            <CoreTypographyBody2 styleClasses={[CoreClasses.MARGIN.MB2]}>
              Provided Information:
            </CoreTypographyBody2>

            {Object.keys(report?.providedData)?.map((data, index) => {
              return (
                <CoreBox
                  key={`providedData-${index}`}
                  styleClasses={[
                    // --- CoreClasses.DISPLAY.INLINE_BLOCK,
                    CoreClasses.MARGIN.M1
                  ]}
                >
                  <CoreChip
                    avatar={
                      <CoreAvatar
                        styleClasses={[CoreClasses.COLOR.TEXT_WHITE, CoreClasses.BG.BG_SUCCESS]}
                        label={report?.providedData[data]}
                      />
                    }
                    label={data}
                    size="small"
                  />
                </CoreBox>
              );
            })}

            <CoreBox
              styleClasses={[
                CoreClasses.MARGIN.MT2
                // --- CoreClasses.ALIGNMENT.JUSTIFY_CONTENT_FLEX_END,
              ]}
            >
              <CoreContainedButton
                label="Complete Profile"
                onClick={() => {
                  navigate(`/${RoutesRegistry.PROFILE}`);
                }}
              />
            </CoreBox>
          </CoreCardContent>
        </CoreCard>
      )}
    </>
  );
}
