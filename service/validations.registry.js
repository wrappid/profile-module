const profileValidations = require("./validations/profile.validation");

const validationsRegistry = {
    ...profileValidations
};

exports.validationsRegistry = validationsRegistry;