export const masterDataMap = {
  getOptionLabel: (data) => {
    return data?.label?.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }) || "";
  },
  getOptionValue: (data) => {
    return data?.label;
  },
  isOptionEqualToValue: (option, value) => {
    return option?.name === value;
  },
};

export const profileRegistrationSpecilization = {
  getOptionValue: (data) => {
    return { id: data?.id || "", label: data?.name || "" };
  },
};