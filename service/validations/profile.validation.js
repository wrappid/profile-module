
const yup = require("yup");

const getContactInfo = {
    body: yup.object({}).noUnknown().strict(),
    query: yup.object({}).noUnknown().strict(),
  };

const getAddressTypeSchema = {
  body: yup.object({}).noUnknown().strict(),
  query: yup.object({}).noUnknown().strict(),
};


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

  module.exports = {getContactInfo,getAddressTypeSchema,departmentGET};