export function getState(formik, others) {
    const parent = formik?.values ? formik?.values?.country : -1;
  
    return others.type === "mount"
      ? { dependentQuery: { parentId: parent } }
      : { dependentQuery: { parentId: parent }, calculatedValue: "" };
  }
  
  export function getDistrict(formik, others) {
    const parent = formik?.values ? formik?.values?.state : -1;
  
    return others.type === "mount"
      ? { dependentQuery: { parentId: parent } }
      : { dependentQuery: { parentId: parent }, calculatedValue: "" };
  }
  
  export function getCity(formik, others) {
    const parent = formik?.values ? formik?.values?.district : -1;
  
    return others.type === "mount"
      ? { dependentQuery: { parentId: parent } }
      : { dependentQuery: { parentId: parent }, calculatedValue: "" };
  }
  