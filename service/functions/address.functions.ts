/* eslint-disable no-console */
import {
  databaseProvider,
  deleteS3FIle,
  messageProcessor,
  getUrl,
  upload,
  entityStatus,
} from "@wrappid/service-core";

import { DEFAULT_DB } from "../constants/profile.constants";

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} databaseActions
 * @returns
 */
const createAddress = async (req, res, databaseActions) => {
  try {
    let del_urls = [];
    let personId = req.params.id;

    await upload.fields([{ maxCount: 1, name: "clinicLogo" }])(
      req,
      res,
      async function (err) {
        try {
          if (err) {
            console.log("FIle Upload error", err);
            throw err;
          } else {
            let data = req.body;
            let file_url = null;

            if (req.files["clinicLogo"] && req.files["clinicLogo"][0]) {
              file_url = await getUrl(
                req.files["clinicLogo"][0].filename
                  ? req.files["clinicLogo"][0].filename
                  : req.files["clinicLogo"][0].key
                  ? req.files["clinicLogo"][0].key
                  : req.files["clinicLogo"][0].originalname
              );
              data[""];
            }

            let result =
              await databaseProvider.application.sequelize.transaction(
                async (transaction) => {
                  let address = await databaseActions.findByPk(
                    DEFAULT_DB,
                    "AddressTypes",
                    data.addressTypeId
                  );
                  let addDetail = await databaseActions.create(
                    DEFAULT_DB,
                    "PersonAddresses",
                    {
                      ...data,
                      _status: entityStatus.ACTIVE,
                      createdBy: req.user.userId,
                      personId: personId,
                      updatedBy: req.user.userId,
                    },
                    { transaction }
                  );

                  let clinicDetail = {};

                  if (address?.type?.toLowerCase() === "clinic") {
                    clinicDetail = await databaseActions.create(
                      DEFAULT_DB,
                      "Clinics",
                      {
                        _status: entityStatus.ACTIVE,
                        createdBy: req.user.userId,
                        name: data.fullName,
                        personAddressId: addDetail.id,
                        photoUrl: file_url,
                        updatedBy: req.user.userId,
                      },
                      { transaction }
                    );
                  }

                  return {
                    addressId: addDetail?.id,
                    clinicId: clinicDetail?.id,
                  };
                }
              );

            console.log("Address created", result);
            res.status(200).json({ message: messageProcessor(200005) });
          }
        } catch (err) {
          console.log(err);
          await deleteS3FIle(del_urls);
          res.status(500).json({ message: messageProcessor(err) });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return { message: messageProcessor(err), status: 500 };
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} databaseActions
 */
async function updateAddress(req, res, databaseActions) {
  try {
    let del_urls = [];
    let addressId = req.params.id;
    let file_url = null;

    await upload.fields([{ maxCount: 1, name: "clinicLogo" }])(
      req,
      res,
      async function (err) {
        try {
          if (err) {
            console.log("FIle Upload error", err);
            throw err;
          } else {
            let data = req.body;

            if (req.files["clinicLogo"] && req.files["clinicLogo"][0]) {
              file_url = await getUrl(
                req.files["clinicLogo"][0].filename
                  ? req.files["clinicLogo"][0].filename
                  : req.files["clinicLogo"][0].key
                  ? req.files["clinicLogo"][0].key
                  : req.files["clinicLogo"][0].originalname
              );
              data[""];
            }
            await databaseProvider.application.sequelize.transaction(
              async (transaction) => {
                let address = await databaseActions.findByPk(
                  DEFAULT_DB,
                  "PersonAddresses",
                  req.params.id,
                  {
                    include: [
                      {
                        model: databaseProvider.application.models.AddressTypes,
                      },
                    ],
                  }
                );
                let updateInfo = await databaseActions.update(
                  DEFAULT_DB,
                  "PersonAddresses",
                  {
                    ...data,
                    updatedBy: req.user.userId,
                  },
                  {
                    transaction,
                    where: { id: addressId },
                  }
                );

                if (updateInfo[0] === 0) {
                  throw 290007;
                }

                if (address?.AddressType?.type?.toLowerCase() === "clinic") {
                  console.log("Clinic Url", file_url);
                  let updateOb = {
                    name: data.fullName,
                    updatedBy: req.user.userId,
                  };

                  if (file_url) {
                    updateOb["photoUrl"] = file_url;
                  }
                  updateInfo = await databaseActions.update(
                    DEFAULT_DB,
                    "Clinics",
                    updateOb,
                    {
                      transaction,
                      where: { personAddressId: addressId },
                    }
                  );

                  if (updateInfo === 0) {
                    throw 290008;
                  }
                }
              }
            );

            console.log("Registration detail created");
            res.status(200).json({ message: messageProcessor(200006) });
          }
        } catch (err) {
          console.log(err);
          await deleteS3FIle(del_urls);
          res.status(500).json({ message: messageProcessor(err) });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: messageProcessor(err) });
  }
}

/**
 *
 * @param {*} req
 * @param {*} databaseActions
 * @returns
 */
async function deleteAddress(req, databaseActions) {
  try {
    await databaseProvider.application.sequelize.transaction(
      async (transaction) => {
        let addressId = req.params.id;
        let address = await databaseActions.findByPk(
          DEFAULT_DB,
          "PersonAddresses",
          addressId,
          {
            include: [
              { model: databaseProvider.application.models.AddressTypes },
            ],
          }
        );

        let updateInfo = await databaseActions.update(
          DEFAULT_DB,
          "PersonAddresses",
          {
            _status: entityStatus.DELETED,
            isActive: false,
            updatedBy: req.user.userId,
          },
          {
            transaction,
            where: { id: addressId },
          }
        );

        if (updateInfo[0] === 0) {
          console.error("Error here address");
          throw 290009;
        }

        if (address?.AddressType?.type?.toLowerCase() === "clinic") {
          updateInfo = await databaseActions.update(
            DEFAULT_DB,
            "Clinics",
            {
              isActive: false,
              updatedBy: req.user.userId,
            },
            {
              transaction,
              where: { personAddressId: addressId },
            }
          );

          if (updateInfo[0] === 0) {
            console.error("Error here clinic");
            throw 290009;
          }
        }
      }
    );

    console.log("Address deleted: ", req.params.id);
    return { message: messageProcessor(200007), status: 200 };
  } catch (error) {
    console.log("Address Delete error", error);
    return { message: messageProcessor(error), status: 500 };
  }
}

module.exports = {
  createAddress,
  deleteAddress,
  updateAddress,
};
