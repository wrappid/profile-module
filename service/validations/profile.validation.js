const moment = require("moment");
const yup = require("yup");

const getContactInfo = {
  body : yup.object({}).noUnknown().strict(),
  query: yup.object({}).noUnknown().strict(),
};

const getAddressTypeSchema = {
  body : yup.object({}).noUnknown().strict(),
  query: yup.object({}).noUnknown().strict(),
};

const getPersonContacts = {
  body : yup.object({}).noUnknown().strict(),
  query: yup.object({}).noUnknown().strict(),
};

const getRegistrationInfo = {
  body : yup.object({}).noUnknown().strict(),
  query: yup.object({}).noUnknown().strict(),
};

const departmentGET = {
  body  : yup.object({}).noUnknown().strict(),
  params: yup.object({}).noUnknown().strict(),
  query : yup.object({ isActive: yup.boolean() }).noUnknown().strict(),
};
const putUpdateExperience = yup.object({
  body: yup
    .object({
      description : yup.string().max(150),
      designation : yup.string().max(50),
      endDate     : yup.string().nullable(),
      endMonth    : yup.string().max(150),
      endYear     : yup.string().max(150),
      field       : yup.string().max(150),
      id          : yup.mixed(),
      isActive    : yup.boolean(),
      location    : yup.string().max(150),
      organization: yup.string().max(150),
      startDate   : yup.string(),
      startMonth  : yup.string().max(150),
      startYear   : yup.string().max(150),
      type        : yup.string().max(50),
    })
    .noUnknown()
    .strict(),
});

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
  gender  : yup.string().required("Gender is required"),
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
      regDate: yup.string(),
      regNo  : yup.string(),
      regYear: yup.string(),
    })
    .noUnknown()
    .strict(),
});

const postAddEducation = yup.object({
  body: yup
    .object({
      board     : yup.string().max(150),
      degree    : yup.string().max(50),
      endDate   : yup.string().nullable(),
      endMonth  : yup.string().max(150),
      endYear   : yup.string().max(150),
      field     : yup.string().max(150),
      location  : yup.string().max(150),
      school    : yup.string().max(150),
      startDate : yup.string(),
      startMonth: yup.string().max(150),
      startYear : yup.string().max(150),
      type      : yup.string().max(50),
    })
    .noUnknown()
    .strict(),
});

const postUpdateEducation = yup.object({
  body: yup
    .object({
      board     : yup.string().max(150),
      degree    : yup.string().max(50),
      endDate   : yup.string().nullable(),
      endMonth  : yup.string().max(150),
      endYear   : yup.string().max(150),
      field     : yup.string().max(150),
      id        : yup.mixed(),
      isActive  : yup.boolean(),
      location  : yup.string().max(150),
      school    : yup.string().max(150),
      startDate : yup.string(),
      startMonth: yup.string().max(150),
      startYear : yup.string().max(150),
      type      : yup.string().max(50),
    })
    .noUnknown()
    .strict(),
});

const putDeleteEducation = yup.object({
  body: yup
    .object({ isActive: yup.boolean() })
    .noUnknown()
    .strict(),
});

const postAddExperience = yup.object({
  body: yup
    .object({
      description : yup.string().max(150),
      designation : yup.string().max(50),
      endDate     : yup.string().nullable(),
      endMonth    : yup.string().max(150),
      endYear     : yup.string().max(150),
      field       : yup.string().max(150),
      location    : yup.string().max(150),
      organization: yup.string().max(150),
      startDate   : yup.string(),
      startMonth  : yup.string().max(150),
      startYear   : yup.string().max(150),
      type        : yup.string().max(50),
    })
    .noUnknown()
    .strict(),
});

const putDeleteExperience =  yup.object({
  body: yup
    .object({ isActive: yup.boolean() })
    .noUnknown()
    .strict(),
});

module.exports = {
  departmentGET,
  getAddressTypeSchema,
  getContactInfo,
  getPersonContacts,
  getRegistrationInfo,
  postAddEducation,
  postAddExperience,
  postUpdateEducation,
  putBasicDetails,
  putDeleteEducation,
  putDeleteExperience,
  putRegistrationDetails,
  putUpdateExperience
};
