export const profileBasicgender = {
  getOptionLabel: (data) => {
    return data?.label?.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }) || "";
  },
  getOptionValue: (data) => {
    return data?.label;/* typeof data === "string"
      ? { id: data.toLowerCase(), label: data }
      : { id: data?.name || "", label: data?.label || "" } */;
  },
  isOptionEqualToValue: (option, value) => {
    if (typeof option === typeof value && typeof option === "string") {
      return option === value;
    } else {
      return option?.id === value?.id;
    }
  },
};

export const profileRegistrationSpecilization = {
  getOptionValue: (data) => {
    return { id: data?.id || "", label: data?.name || "" };
  },
};