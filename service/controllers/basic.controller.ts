/* eslint-disable no-console */
const { databaseActions, messageProcessor } = require("@wrappid/service-core");

const { updateBasicDetails } = require("../functions/basic.functions");

module.exports.updateBasicDetails = async (req, res) => {
  try {
    await updateBasicDetails(req, res, databaseActions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: messageProcessor(err) });
  }
};
