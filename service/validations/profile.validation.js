
const yup = require("yup");
const moment = require("moment");


const getContactInfo = {
  body: yup.object({}).noUnknown().strict(),
  query: yup.object({}).noUnknown().strict(),
};

const getAddressTypeSchema = {
  body: yup.object({}).noUnknown().strict(),
  query: yup.object({}).noUnknown().strict(),
};

const getPersonContacts = {
  body: yup.object({}).noUnknown().strict(),
  query: yup.object({}).noUnknown().strict(),
}

const getRegistrationInfo = {
  body: yup.object({}).noUnknown().strict(),
  query: yup.object({}).noUnknown().strict(),
}

const departmentGET = {
  body: yup.object({}).noUnknown().strict(),
  params: yup.object({}).noUnknown().strict(),
  query: yup
    .object({
      isActive: yup.boolean(),
    })
    .noUnknown()
    .strict(),
};


const putBasicDetails = yup.object({
  bio: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9\s.'"@$&-/\\?]+$/,
      "All special charecters are not allowed"
    ),
  dob: yup
    .date()
    .required()
    .min(moment().subtract(115, "years"), "MIN_AGE")
    .max(moment().endOf("day").subtract(18, "years"), "Min age should be 18"),
  firstName: yup
    .string()
    .trim()
    .required()
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed for this field "),
  gender: yup.string().required("Gender is required"),
  lastName: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed for this field "),
  middleName: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed for this field "),
});

const putRegistrationDetails = yup.object({
  body: yup
    .object({
      regNo: yup.string(),
      regYear: yup.string(),
      regDate: yup.string(),
    })
    .noUnknown()
    .strict(),
});


const postAddEducation = yup.object({
  type: yup.string().max(50),
  degree: yup.string().max(50),
  school: yup.string().max(150),
  location: yup.string().max(150),
  board: yup.string().max(150),
  field: yup.string().max(150),
  startMonth: yup.string().max(150),
  startYear: yup.string().max(150),
  endMonth: yup.string().max(150),
  endYear: yup.string().max(150),
  startDate: yup.string(),
  endDate: yup.string().nullable(),
});
// .noUnknown()
// .strict();



module.exports = { getContactInfo, getAddressTypeSchema, departmentGET, getPersonContacts, getRegistrationInfo, putBasicDetails, putRegistrationDetails, postAddEducation };