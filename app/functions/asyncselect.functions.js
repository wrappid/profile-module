export const profileBasicgender = {
  getOptionLabel: (data) => {
    return data?.label || "";
  },
  getOptionValue: (data) => {
    return typeof data === "string"
      ? { id: data, label: data }
      : { id: data?.label || "", label: data?.label || "" };
  },
  isOptionEqualToValue: (option, value) => {
    if (typeof option === typeof value && typeof option === "string") {
      return option === value;
    } else {
      return option?.id === value?.id;
    }
  },
};