/* eslint-disable no-console */
// eslint-disable-next-line no-undef
const { databaseActions } = require("@wrappid/service-core");

// eslint-disable-next-line no-undef
const { createAddress, updateAddress, deleteAddress } = require("../functions/address.functions");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createAddress = async (req, res) => {
  try {
    await createAddress(req, res, databaseActions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error to create person address" });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.updateAddress = async (req, res) => {
  try {
    await updateAddress(req, res, databaseActions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error to update person address" });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.deleteAddress = async (req, res) => {
  try {
    let data = await deleteAddress(req, databaseActions);

    res.status(data.status).json({ data: data?.data, message: data?.message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error to delete person address" });
  }
};
