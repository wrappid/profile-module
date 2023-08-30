
const yup = require("yup");

const getContactInfo = {
    body: yup.object({}).noUnknown().strict(),
    query: yup.object({}).noUnknown().strict(),
  };

const getAddressTypeSchema = {
  body: yup.object({}).noUnknown().strict(),
  query: yup.object({}).noUnknown().strict(),
};

  module.exports = {getContactInfo,getAddressTypeSchema};