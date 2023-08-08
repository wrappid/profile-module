/* eslint-disable no-unused-vars */
export const SanBasicEditUrlChange = (formData, apiMeta, state, others) => {
  // -- console.log("SANITING", apiMeta, others);
  if (formData.gender) {
    formData.gender = formData.gender.id;
  }
  if (formData.departmentId) {
    formData.departmentId = formData.departmentId.id;
  }
  return {
    endpoint: apiMeta.endpoint.replace(":id", state?.profile?.basic?.id),
    values  : formData,
  };
};