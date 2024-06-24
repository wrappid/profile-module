import { getFormikRequiredMessage } from "@wrappid/core";
import moment from "moment";
import { string, date, mixed, boolean, object } from "yup";

export const ValidationsRegistry = {
  profileBaic: {
    bio: 
      string()
        .trim()
      // .required(getFormikRequiredMessage("bio"))
        .matches(
          /^[a-zA-Z0-9\s.'"@$&-/\\?]+$/,
          "All special charecters are not allowed"
        ),
    dob: 
      date()
        .required(getFormikRequiredMessage("dateOfBirth"))
        .min(moment().subtract(115, "years"), "MIN_AGE")
        .max(moment().endOf("day").subtract(18, "years"), "Min age should be 18"),
    firstName: string()
      .trim()
      .required(getFormikRequiredMessage("firstName"))
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed for this field "),
    gender: string().required("Gender is required"),
    lastName: 
      string()
        .trim()
        .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed for this field "),
    middleName: 
      string()
        .trim()
        .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed for this field "),
    photo: mixed()
      .test("fileSize", "File size must be less than 5MB", (value) => {
        if (!value) return true; 
        return value.size <= 5242880;
      }),
  },
  profileEducation: {
    board: 
      string()
        .trim()
        .required("Board name is required")
        .matches(
          /^[a-zA-Z0-9\s-.,/()[\]]+$/,
          "All special charecters are not allowed except - . , / ( ) [ ]"
        ),
    degree: string()
      .trim()
      .required("Degree is required")
      .matches(
        /^[a-zA-Z0-9\s-.,/()[\]]+$/,
        "All special charecters are not allowed except - . , / ( ) [ ]"
      ),
    endDate: 
      date()
        .max(new Date(), "Must be today or earlier than today")
        .when("isCurrent", {
          is       : true,
          otherwise: () =>
            date()
              .required("End date required")
              .test(
                "start-end-check",
                "End date should be after start date",
                (val, props) => {
                  // -- console.log("kkikikiki", props.parent.startDate, val, moment(props.parent.startDate).diff(moment(val), 'days'));
                  // -- console.log("HERER", val);
                  if (
                    props.parent.startDate &&
                val &&
                moment(val).diff(moment(props.parent.startDate), "days") > 0
                  ) {
                    return true;
                  } else return false;
                }
              ),
          then: () => date(),
        }),
    isCurrent: boolean().notRequired(),
    school   : string()
      .trim()
      .required("School name is required")
      .matches(
        /^[a-zA-Z0-9\s-.,/()[\]]+$/,
        "All special charecters are not allowed except - . , / ( ) [ ]"
      ),
    startDate: date()
      .max(new Date(), "Must be today or earlier than today")
      .required("Start date is required"),
  },
  profileExperience: {
    designation: string()
      .trim()
      .required("Designation is required")
      .matches(
        /^[a-zA-Z0-9\s-.,/()[\]]+$/,
        "All special charecters are not allowed except - . , / ( ) [ ]"
      ),
    endDate: 
      date()
        .max(new Date(), "Must be today or earlier than today")
        .when("isCurrent", {
          is       : true,
          otherwise: () =>
            date()
              .required("End date required")
              .test(
                "start-end-check",
                "End date should be after start date",
                (val, props) => {
                  // -- console.log("kkikikiki", props.parent.startDate, val, moment(props.parent.startDate).diff(moment(val), 'days'));
                  // -- console.log("HERER", val);
                  if (
                    props.parent.startDate &&
                val &&
                moment(val).diff(moment(props.parent.startDate), "days") > 0
                  ) {
                    return true;
                  } else return false;
                }
              ),
          then: date(),
        }),
    isCurrent: boolean().notRequired(),
    location : string()
      .trim()
      .required("Location is required")
      .matches(
        /^[a-zA-Z0-9\s-.,/()[\]]+$/,
        "All special charecters are not allowed except - . , / ( ) [ ]"
      )
      .required(),
    organization: 
      string()
        .trim()
        .required("Organization name is required")
        .matches(
          /^[a-zA-Z0-9\s-.,/()[\]]+$/,
          "All special charecters are not allowed except - . , / ( ) [ ]"
        ),
    startDate: 
    date()
      .max(new Date(), "Must be today or earlier than today")
      .required("Start date is required"),
  },
  profileRegistration: {
    departmentId: string().required("Department is required"),
    regDate: 
      date()
        .max(new Date(), "Registration date must be today or earlier than today")
        .required("Registration date is required"),
    regNo: 
      string()
        .trim()
        .required("Registration No. is required")
        .matches(
          /^[a-zA-Z0-9\s-/]+$/,
          "Special charecters are not allowed except - and /"
        ),
    registrationDocument: object().nullable(),
  }
};