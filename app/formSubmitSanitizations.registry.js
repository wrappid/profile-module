export function SanBasicEditUrlChange(formData, apiMeta, state, others) {
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
}

export function SanProfileClinicRead(data) {
  // -- console.log("SANITING", apiMeta, others);
  return data?.rows?.map((m) => {
    return {
      addLine1  : m?.addLine1,
      addLine2  : m?.addLine2,
      city      : m?.city,
      clinicLogo: m?.Clinic?.photoUrl,
      country   : m?.country,
      district  : m?.district,
      fullName  : m?.fullName,
      id        : m?.id,
      landmark  : m?.landmark,
      phone     : m?.phone,
      pin       : m?.pin,
      state     : m?.state,
    };
  });
}

//PROFILE EDUCATION SANITIZATION FUNCTIONS
export function SanEducationAddUrlChange(formData, apiMeta, state, others) {
  // -- console.log("SANITING", apiMeta.endpoint, others);
  return {
    endpoint: apiMeta.endpoint.replace(":id", state?.profile?.basic?.id),
    values  : formData,
  };
}
  
export function SanEducationEditUrlChange(formData, apiMeta, state, others) {
  // -- console.log("SANITING", apiMeta, others);
  return {
    endpoint: apiMeta.endpoint.replace(":id", others.editing),
    values  : formData,
  };
}
  
export function SanEducationReadUrlChange(formData, apiMeta, state, others) {
  // -- console.log("SANITING", apiMeta, others);
  return {
    endpoint: apiMeta.endpoint.replace(":id", state?.profile?.basic?.id),
    values  : formData,
  };
}
  
export function SanProfileEducationRead(data) {
  // -- console.log("SANITING", apiMeta, others);
  return data?.rows?.map((m) => {
    return {
      board    : m?.board,
      degree   : m?.degree,
      endDate  : m?.endDate,
      field    : m?.field,
      id       : m?.id,
      isCurrent: m?.endDate ? false : true,
      location : m?.location,
      school   : m?.school,
      startDate: m?.startDate,
    };
  });
}
  
//PROFILE EXP SANITIZATION FUNCTIONS
export function SanExperienceAddUrlChange(formData, apiMeta, state, others) {
  // -- console.log("SANITING", apiMeta.endpoint, others);
  return {
    endpoint: apiMeta.endpoint.replace(":id", state?.profile?.basic?.id),
    values  : formData,
  };
}
  
export function SanExperienceEditUrlChange(formData, apiMeta, state, others) {
  // -- console.log("SANITING", apiMeta, others);
  return {
    endpoint: apiMeta.endpoint.replace(":id", others.editing),
    values  : formData,
  };
}
  
export function SanExperienceReadUrlChange(formData, apiMeta, state, others) {
  // -- console.log("SANITING", apiMeta, others);
  return {
    endpoint: apiMeta.endpoint.replace(":id", state?.profile?.basic?.id),
    values  : formData,
  };
}
  
export function SanProfileBasicRead(data) {
  // -- console.log("SANITING", apiMeta, others);
  return {
    bio      : data?.data.extraInfo ? data?.data.extraInfo.bio : "",
    dob      : data?.data.dob ? data?.data.dob : "",
    firstName: data?.data.firstName ? data.data.firstName : "",
    gender   : data?.data.gender
      ? { id: data?.data.gender, label: data?.data.gender }
      : "",
    lastName  : data?.data.lastName ? data.data.lastName : "",
    middleName: data?.data.middleName ? data.data.middleName : "",
    photo     : data?.data.photoUrl ? data?.data.photoUrl : "",
  };
}
  
export function SanProfileRegistrationRead(data, otherData) {
  // -- console.log("Registration SANITING", otherData?.AllDepartments);
  if (data && data.departmentId) {
    let dept = otherData?.AllDepartments?.find(
      (d) => d.id === data.departmentId
    );

    return {
      degrees     : data.degrees ? data.degrees : "",
      departmentId: dept
        ? { id: dept.id, label: dept.name }
        : { id: "", label: "" },
      regDate             : data.regDate ? data.regDate : "",
      regNo               : data.regNo ? data.regNo : "",
      registrationDocument: data.registrationDocument,
    };
  } else {
    return { departmentId: { id: "", label: "" }, regDate: "", regNo: "" };
  }
}
  
export function SanRegistrationReadUrlChange(formData, apiMeta, state, others) {
  return {
    endpoint : apiMeta.endpoint,
    reduxData: { AllDepartments: state.common.departments },
    values   : formData,
  };
}
  
export function SanProfileExperienceRead(data) {
  // -- console.log("SANITING", apiMeta, others);
  return data?.rows?.map((m) => {
    return {
      designation : m?.designation,
      endDate     : m?.endDate,
      id          : m?.id,
      isCurrent   : m?.endDate ? false : true,
      location    : m?.location,
      organization: m?.organization,
      startDate   : m?.startDate,
    };
  });
}