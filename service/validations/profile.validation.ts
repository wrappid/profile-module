import moment from "moment";
import * as yup from "yup";

const getContactInfo = {
  body: yup.object<any>().noUnknown().strict(),
  query: yup.object<any>().noUnknown().strict(),
};

const getAddressTypeSchema = {
  body: yup.object<any>().noUnknown().strict(),
  query: yup.object<any>().noUnknown().strict(),
};

const getPersonContacts = {
  body: yup.object<any>().noUnknown().strict(),
  query: yup.object<any>().noUnknown().strict(),
};

const getRegistrationInfo = {
  body: yup.object<any>().noUnknown().strict(),
  query: yup.object<any>().noUnknown().strict(),
};

const departmentGET = {
  body: yup.object<any>().noUnknown().strict(),
  query: yup.ObjectSchema<{ isActive: any }>,
};

const putUpdateExperience: yup.ObjectSchema<{
  body: {
    description?: string;
    designation?: string;
    endDate?: string | null;
    endMonth?: string;
    endYear?: string;
    field?: string;
    id?: unknown;
    isActive?: boolean;
    location?: string;
    organization?: string;
    startDate?: string;
    startMonth?: string;
    startYear?: string;
    type?: string;
  };
}> = yup.object({
  body: yup
    .object({
      description: yup.string().max(150),
      designation: yup.string().max(50),
      endDate: yup.string().nullable(),
      endMonth: yup.string().max(150),
      endYear: yup.string().max(150),
      field: yup.string().max(150),
      id: yup.mixed(),
      isActive: yup.boolean(),
      location: yup.string().max(150),
      organization: yup.string().max(150),
      startDate: yup.string(),
      startMonth: yup.string().max(150),
      startYear: yup.string().max(150),
      type: yup.string().max(50),
    })
    .noUnknown()
    .strict(),
});

const putBasicDetails: yup.ObjectSchema<{
  bio?: string;
  dob?: Date;
  firstName?: string;
  gender?: string;
  lastName?: string;
  middleName?: string;
}> = yup.object({
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

const putRegistrationDetails: yup.ObjectSchema<{
  body: {
    regDate?: string;
    regNo?: string;
    regYear?: string;
  };
}> = yup.object({
  body: yup
    .object({
      regDate: yup.string(),
      regNo: yup.string(),
      regYear: yup.string(),
    })
    .noUnknown()
    .strict(),
});

const postAddEducation: yup.ObjectSchema<{
  body: {
    board?: string;
    degree?: string;
    endDate?: string | null;
    endMonth?: string;
    endYear?: string;
    field?: string;
    location?: string;
    school?: string;
    startDate?: string;
    startMonth?: string;
    startYear?: string;
    type?: string;
  };
}> = yup.object({
  body: yup
    .object({
      board: yup.string().max(150),
      degree: yup.string().max(50),
      endDate: yup.string().nullable(),
      endMonth: yup.string().max(150),
      endYear: yup.string().max(150),
      field: yup.string().max(150),
      location: yup.string().max(150),
      school: yup.string().max(150),
      startDate: yup.string(),
      startMonth: yup.string().max(150),
      startYear: yup.string().max(150),
      type: yup.string().max(50),
    })
    .noUnknown()
    .strict(),
});

const postUpdateEducation: yup.ObjectSchema<{
  body: {
    board?: string;
    degree?: string;
    endDate?: string | null;
    endMonth?: string;
    endYear?: string;
    field?: string;
    id?: unknown;
    isActive?: boolean;
    location?: string;
    school?: string;
    startDate?: string;
    startMonth?: string;
    startYear?: string;
    type?: string;
  };
}> = yup.object({
  body: yup
    .object({
      board: yup.string().max(150),
      degree: yup.string().max(50),
      endDate: yup.string().nullable(),
      endMonth: yup.string().max(150),
      endYear: yup.string().max(150),
      field: yup.string().max(150),
      id: yup.mixed(),
      isActive: yup.boolean(),
      location: yup.string().max(150),
      school: yup.string().max(150),
      startDate: yup.string(),
      startMonth: yup.string().max(150),
      startYear: yup.string().max(150),
      type: yup.string().max(50),
    })
    .noUnknown()
    .strict(),
});

const putDeleteEducation: yup.ObjectSchema<{
  body: {
    isActive?: boolean;
  };
}> = yup.object({
  body: yup.object({ isActive: yup.boolean() }).noUnknown().strict(),
});

const postAddExperience: yup.ObjectSchema<{
  body: {
    description?: string;
    designation?: string;
    endDate?: string | null;
    endMonth?: string;
    endYear?: string;
    field?: string;
    location?: string;
    organization?: string;
    startDate?: string;
    startMonth?: string;
    startYear?: string;
    type?: string;
  };
}> = yup.object({
  body: yup
    .object({
      description: yup.string().max(150),
      designation: yup.string().max(50),
      endDate: yup.string().nullable(),
      endMonth: yup.string().max(150),
      endYear: yup.string().max(150),
      field: yup.string().max(150),
      location: yup.string().max(150),
      organization: yup.string().max(150),
      startDate: yup.string(),
      startMonth: yup.string().max(150),
      startYear: yup.string().max(150),
      type: yup.string().max(50),
    })
    .noUnknown()
    .strict(),
});

const putDeleteExperience: yup.ObjectSchema<{
  body: {
    isActive?: boolean;
  };
}> = yup.object({
  body: yup.object({ isActive: yup.boolean() }).noUnknown().strict(),
});

export {
  getContactInfo,
  getAddressTypeSchema,
  getPersonContacts,
  getRegistrationInfo,
  departmentGET,
  putUpdateExperience,
  putBasicDetails,
  putRegistrationDetails,
  postAddEducation,
  postUpdateEducation,
  putDeleteEducation,
  postAddExperience,
  putDeleteExperience,
};
