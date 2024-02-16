/* eslint-disable no-console */
import { /* databaseActions, messageProcessor */ } from "@wrappid/service-core";

import {updateBasicDetails}  from "../functions/basic.functions";

module.exports.updateBasicDetails = async (req, res) => {
  try {
    await updateBasicDetails(req, res, /* databaseActions */);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "unknown"/* messageProcessor(err) */ });
  }
};
