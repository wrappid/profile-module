import { getFormikRequiredMessage } from "@wrappid/core";
import moment from "moment";
import * as yup from "yup";

export const ValidationRegistry = {
  profileBaic: {
    bio: yup
      .string()
      .trim()
    // .required(getFormikRequiredMessage("bio"))
      .matches(
        /^[a-zA-Z0-9\s.'"@$&-/\\?]+$/,
        "All special charecters are not allowed"
      ),
    dob: yup
      .date()
      .min(moment().subtract(115, "years"), "MIN_AGE")
      .max(moment().endOf("day").subtract(18, "years"), "Min age should be 18"),
    firstName: yup
      .string()
      .trim()
      .required(getFormikRequiredMessage("firstName"))
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed for this field "),
    gender  : yup.object().required("Gender is required"),
    lastName: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed for this field "),
    middleName: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed for this field "),
  },
  profileEducation: {
    board: yup
      .string()
      .trim()
      .required("Board name is required")
      .matches(
        /^[a-zA-Z0-9\s-.,/()[\]]+$/,
        "All special charecters are not allowed except - . , / ( ) [ ]"
      ),
    degree: yup
      .string()
      .trim()
      .required("Degree is required")
      .matches(
        /^[a-zA-Z0-9\s-.,/()[\]]+$/,
        "All special charecters are not allowed except - . , / ( ) [ ]"
      ),
    endDate: yup
      .date()
      .max(new Date(), "Must be today or earlier than today")
      .when("isCurrent", {
        is       : true,
        otherwise: yup
          .date()
          .required("End date required")
          .test(
            "start-end-check",
            "End date should be after start date",
            (val, props) => {
              // console.log("kkikikiki", props.parent.startDate, val, moment(props.parent.startDate).diff(moment(val), 'days'));
              console.log("HERER", val);
              if (
                props.parent.startDate &&
                val &&
                moment(val).diff(moment(props.parent.startDate), "days") > 0
              ) {
                return true;
              } else return false;
            }
          ),
        then: yup.date(),
      }),
    isCurrent: yup.boolean().notRequired(),
    school   : yup
      .string()
      .trim()
      .required("School name is required")
      .matches(
        /^[a-zA-Z0-9\s-.,/()[\]]+$/,
        "All special charecters are not allowed except - . , / ( ) [ ]"
      ),
    startDate: yup
      .date()
      .max(new Date(), "Must be today or earlier than today")
      .required("Start date is required"),
  },
  profileExperience: {
    designation: yup
      .string()
      .trim()
      .required("Designation is required")
      .matches(
        /^[a-zA-Z0-9\s-.,/()[\]]+$/,
        "All special charecters are not allowed except - . , / ( ) [ ]"
      ),
    endDate: yup
      .date()
      .max(new Date(), "Must be today or earlier than today")
      .when("isCurrent", {
        is       : true,
        otherwise: yup
          .date()
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
        then: yup.date(),
      }),
    isCurrent: yup.boolean().notRequired(),
    location : yup
      .string()
      .trim()
      .required("Location is required")
      .matches(
        /^[a-zA-Z0-9\s-.,/()[\]]+$/,
        "All special charecters are not allowed except - . , / ( ) [ ]"
      )
      .required(),
    organization: yup
      .string()
      .trim()
      .required("Organization name is required")
      .matches(
        /^[a-zA-Z0-9\s-.,/()[\]]+$/,
        "All special charecters are not allowed except - . , / ( ) [ ]"
      ),
    startDate: yup
      .date()
      .max(new Date(), "Must be today or earlier than today")
      .required("Start date is required"),
  },
  profileRegistration: {
    departmentId: yup.object().required("Department is required"),
    regDate     : yup
      .date()
      .max(new Date(), "Registration date must be today or earlier than today")
      .required("Registration date is required"),
    regNo: yup
      .string()
      .trim()
      .required("Registration No. is required")
      .matches(
        /^[a-zA-Z0-9\s-/]+$/,
        "Special charecters are not allowed except - and /"
      ),
    registrationDocument: yup.object().nullable(),
  }
};