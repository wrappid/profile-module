import { getFormikRequiredMessage } from "@wrappid/core";
import moment from "moment";
import { string, date, mixed, boolean } from "yup";

const dateValidation = date()
  .typeError("Invalid date")
  .test("isValidDate", "Invalid date", (value) => {
    return value && moment(value).isValid();
  });

const profileBaic = {
  bio: 
    string()
      .trim()
      .matches(
        /^[a-zA-Z0-9\s.'"@$&-/\\?]+$/,
        "All special characters are not allowed"
      ),
  dob: 
    dateValidation
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
    .test("fileSize", "Logo size is too large", (value) => {
      if (!value || typeof value === "string") return true;
      return value.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Invalid logo format", (value) => {
      if (!value || typeof value === "string") return true;
      const supportedTypes = ["image/jpeg", "image/png"];

      return supportedTypes.includes(value.type);
    }),
};

const profileEducation = {
  board: 
    string()
      .trim()
      .required("Board name is required")
      .matches(
        /^[a-zA-Z0-9\s-.,/()[\]]+$/,
        "All special characters are not allowed except - . , / ( ) [ ]"
      ),
  degree: string()
    .trim()
    .required("Degree is required")
    .matches(
      /^[a-zA-Z0-9\s-.,/()[\]]+$/,
      "All special characters are not allowed except - . , / ( ) [ ]"
    ),
  endDate: 
    dateValidation
      .max(new Date(), "Must be today or earlier than today")
      .when("isCurrent", {
        is       : true,
        otherwise: () =>
          dateValidation
            .required("End date required")
            .test(
              "start-end-check",
              "End date should be after start date",
              (val, props) => {
                return props.parent.startDate && val && moment(val).diff(moment(props.parent.startDate), "days") > 0;
              }
            ),
        then: () => dateValidation,
      }),
  isCurrent: boolean().notRequired(),
  school   : string()
    .trim()
    .required("School name is required")
    .matches(
      /^[a-zA-Z0-9\s-.,/()[\]]+$/,
      "All special characters are not allowed except - . , / ( ) [ ]"
    ),
  startDate: dateValidation
    .max(new Date(), "Must be today or earlier than today")
    .required("Start date is required"),
};

const profileExperience = {
  designation: string()
    .trim()
    .required("Designation is required")
    .matches(
      /^[a-zA-Z0-9\s-.,/()[\]]+$/,
      "All special characters are not allowed except - . , / ( ) [ ]"
    ),
  endDate: 
    dateValidation
      .max(new Date(), "Must be today or earlier than today")
      .when("isCurrent", {
        is       : true,
        otherwise: () =>
          dateValidation
            .required("End date required")
            .test(
              "start-end-check",
              "End date should be after start date",
              (val, props) => {
                return props.parent.startDate && val && moment(val).diff(moment(props.parent.startDate), "days") > 0;
              }
            ),
        then: () => dateValidation,
      }),
  isCurrent: boolean().notRequired(),
  location : string()
    .trim()
    .required("Location is required")
    .matches(
      /^[a-zA-Z0-9\s-.,/()[\]]+$/,
      "All special characters are not allowed except - . , / ( ) [ ]"
    ),
  organization: 
    string()
      .trim()
      .required("Organization name is required")
      .matches(
        /^[a-zA-Z0-9\s-.,/()[\]]+$/,
        "All special characters are not allowed except - . , / ( ) [ ]"
      ),
  startDate: 
    dateValidation
      .max(new Date(), "Must be today or earlier than today")
      .required("Start date is required"),
};

const profileRegistration = {
  departmentId: string().required("Department is required"),
  regDate: 
    dateValidation
      .max(new Date(), "Registration date must be today or earlier than today")
      .required("Registration date is required"),
  regNo: 
    string()
      .trim()
      .required("Registration No. is required")
      .matches(
        /^[a-zA-Z0-9\s-/]+$/,
        "Special characters are not allowed except - and /"
      ),
  registrationDocument: mixed()
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return true; 
      return value.size <= 5242880;
    })
    .test(
      "fileType",
      "Only PDF and Doc files allowed",
      (value) => {
        if (!value) return true;
        const supportedTypes = ["application/pdf", "application/msword"];

        return supportedTypes.includes(value.type);
      }
    )
};

export {
  profileBaic,
  profileEducation,
  profileExperience,
  profileRegistration
};