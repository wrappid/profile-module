export const profileRegistrationSpecilization = {
    getOptionValue: (data) => {
        return { id: data?.id || "", label: data?.name || "" };
    },
};