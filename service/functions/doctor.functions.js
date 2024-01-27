/* eslint-disable no-console */
const { databaseProvider, deleteS3FIle, messageProcessor, getUrl, upload } = require("@wrappid/service-core");

const { DEFAULT_DB } = require("../constants/profile.constants");

/**
 * 
 * @param {*} req 
 * @returns 
 */
const updateDoctorDetails = async (req, res, databaseActions) => {
    try {
        let del_urls = [];
        let file_url = null;
        let personId = req.params.id;

        await upload.fields([{ maxCount: 1, name: "registrationDocument" }])(req, res, async function (err) {
            try {
                if (err) {
                    console.log("FIle Upload error", err);
                    throw err;
                } else {
                    if (
                        req.files["registrationDocument"] &&
            req.files["registrationDocument"][0]
                    ) {
                        file_url = await getUrl(
                            req.files["registrationDocument"][0].filename
                                ? req.files["registrationDocument"][0].filename
                                : req.files["registrationDocument"][0].key
                                    ? req.files["registrationDocument"][0].key
                                    : req.files["registrationDocument"][0].originalname
                        );
                    }
                    console.log("File URL", file_url);

                    let exists = await databaseActions.findOne(DEFAULT_DB, "DoctorDetails", { where: { doctorId: req.params.id } });

                    del_urls.push(file_url);

                    let data = req.body;
          
                    await databaseProvider.action.sequelize.transaction(async (transaction) => {
                        data.personDocs = [];

                        if (!exists) {
                            console.log("Docotr details not found");
                            await databaseActions.create(DEFAULT_DB, "DoctorDetails",
                                {
                                    ...data,
                                    doctorId : personId,
                                    updatedBy: req.user.userId,
                                },
                                { transaction }
                            );
                        } else {
                            console.log("Docotr details found: ", exists.id);
                        }

                        if (file_url) {
                            let updateInfo = await databaseActions.update(DEFAULT_DB, "PersonDocs",
                                {
                                    docUrl   : file_url,
                                    updatedBy: req.user.userId,
                                },
                                {
                                    transaction,
                                    where: { personId: personId },
                                }
                            );

                            if (updateInfo === 0) {
                                let nPersonDocs = await databaseActions.create(DEFAULT_DB, "PersonDocs",
                                    {
                                        docUrl   : file_url,
                                        personId,
                                        type     : "Registration Document",
                                        updatedBy: req.user.userId,
                                    },
                                    { transaction }
                                );

                                console.log(
                                    "Registration file entry made:",
                                    nPersonDocs.id
                                );
                            } else {
                                console.log("Registration file URL updated");
                            }
                        } else {
                            console.log("No registration file given");
                        }

                        if (data.departmentId) {
                            await databaseActions.update(DEFAULT_DB, "Persons",
                                {
                                    departmentId: data.departmentId,
                                    updatedBy   : req.user.userId,
                                },
                                {
                                    transaction,
                                    where: { id: personId },
                                }
                            );

                            console.log("Department updated");
                        }

                        await databaseActions.update(DEFAULT_DB, "DoctorDetails",
                            {
                                ...data,
                                updatedBy: req.user.userId,
                            },
                            {
                                transaction,
                                where: { doctorId: personId },
                            }
                        );
                    });

                    console.log("Registration detail updated");
                    res.status(200).json({ message: messageProcessor(200003) });
                }
            } catch (err) {
                console.log(err);
                await deleteS3FIle(del_urls);
                res.status(500).json({ message: messageProcessor(err) });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: messageProcessor(err) });
    }
};

/**
 * 
 * @param {*} req 
 * @returns 
 */
const createDoctorDetails = async (req, res, databaseActions) => {
    try {
        let del_urls = [];
        let personId = req.params.id;
  
        await upload.fields([{ maxCount: 1, name: "registrationDocument" }])(req, res, async function (err) {
            try {
                if (err) {
                    console.log("FIle Upload error", err);
                    throw err;
                } else {
                    if (
                        req.files["registrationDocument"] &&
              req.files["registrationDocument"][0]
                    ) {
                        let file_url = null;

                        file_url = await getUrl(
                            req.files["registrationDocument"][0].filename
                                ? req.files["registrationDocument"][0].filename
                                : req.files["registrationDocument"][0].key
                                    ? req.files["registrationDocument"][0].key
                                    : req.files["registrationDocument"][0].originalname
                        );
  
                        let doctorDetails = await databaseActions.findOne(DEFAULT_DB, "DoctorDetails", { where: { personId: req.params.id } });

                        // eslint-disable-next-line  no-undef  
                        del_urls.push(url);
                        if (doctorDetails) {
                            throw 290004;
                        }
                        let data = req.body;

                        // eslint-disable-next-line  no-undef  
                        await db.sequelize.transaction(async (transaction) => {
                            data.personDocs = [];
                            // eslint-disable-next-line  no-undef 
                            await db.PersonDocs.create(
                                {
                                    createdBy: req.user.userId,
                                    personId : personId,
                                    type     : "Registration Document",
                                    updatedBy: req.user.userId,
                                    url      : file_url,
                                },
                                { transaction: transaction }
                            );
                            // eslint-disable-next-line  no-undef 
                            await db.DoctorDetails.create(
                                {
                                    ...req.body,
                                    createdBy: req.user.userId,
                                    doctorId : personId,
                                    updatedBy: req.user.userId,
                                },
                                { transaction: transaction }
                            );
                        });
  
                        console.log("Registration detail created");
                        res.status(200).json({ message: messageProcessor(200002) });
                    } else {
                        throw 290003;
                    }
                }
            } catch (err) {
                console.log(err);
                await deleteS3FIle(del_urls);
                res.status(500).json({ message: messageProcessor(err) });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: messageProcessor(err) });
    }
};

module.exports = { createDoctorDetails, updateDoctorDetails };
