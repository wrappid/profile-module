/* eslint-disable no-unused-vars */
/* eslint-disable id-length */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const testFunctions = require("../functions/test.functions");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.getRegistrationInfo = async (req, res) => {
  try {
    let userID = req.user.userId;

    console.log("User ID = " + userID);

    /**
       * TODO: put another model data to patient if required
       */
    let doctorDetails = await db.DoctorDetails.findOne({
      include: [
        {
          as   : "Persons",
          model: db.Persons,
          where: { userId: userID },
        },
      ],
    });

    let personDocs = doctorDetails
      ? await db.PersonDocs.findOne({
        where: {
          personId: doctorDetails?.dataValues?.Persons?.id,
          type    : "Registration Document",
        },
      })
      : null;

    let temp = { ...doctorDetails?.dataValues };

    delete temp.Persons;
    temp["departmentId"] = doctorDetails?.dataValues?.Persons?.departmentId;
    temp["registrationDocument"] = personDocs?.docUrl;

    doctorDetails
      ? res.status(200).json({
        data   : temp,
        message: "Registration info fetched successfully",
      })
      : res
        .status(204)
        .json({ message: "Person registration info not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error  : err,
      message: "Error while fetch person registration info data",
    });
  }
};

module.exports.getContactInfo = async (req, res) => {
  try {
    let personId = req.user.personId;
    let exists = await db.PersonContacts.findOne({
      where: {
        data    : req.body.data.toString(),
        personId: personId,
      },
    });

    if (exists) {
      console.log("Contact already exists", exists.id);
      res.status(500).json({ message: "Contact already exists" });
    } else {
      let createdContact = await db.PersonContacts.create({
        ...req.body,
        _status : entityStatus.ACTIVE,
        personId: personId,
        type    : isNaN(req.body.data)
          ? constant.contact.EMAIL
          : constant.contact.PHONE,
      });

      console.log(
        "Person contact created, id:",
        createdContact.id,
        ", Person Id: ",
        personId
      );
      res.status(200).json({ message: "Contact info created successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error  : err,
      message: "Contact info create error",
    });
  }
};

module.exports.postContact = async (req, res) => {
  try {
    let personId = req.user.personId;
    let exists = await db.PersonContacts.findOne({
      where: {
        data    : req.body.data.toString(),
        personId: personId,
      },
    });

    if (exists) {
      console.log("Contact already exists", exists.id);
      res.status(500).json({ message: "Contact already exists" });
    } else {
      let createdContact = await db.PersonContacts.create({
        ...req.body,
        _status : entityStatus.ACTIVE,
        personId: personId,
        type    : isNaN(req.body.data)
          ? constant.contact.EMAIL
          : constant.contact.PHONE,
      });

      console.log(
        "Person contact created, id:",
        createdContact.id,
        ", Person Id: ",
        personId
      );
      res.status(200).json({ message: "Contact info created successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error  : err,
      message: "Contact info create error",
    });
  }
};

module.exports.updateContact = async (req, res) => {
  try {
    let contact = await db.PersonContacts.findByPk(req.params.id);

    if (contact.primaryFlag) {
      console.log("Can not delete primary mail");
      res.status(500).json({
        message:
          "Can not delete primary contact. Change primary then try again",
      });
    }
    // -- eslint-disable-next-line no-unused-lets
    let [nrows, rows] = await db.PersonContacts.update(
      {
        _status  : entityStatus.DELETED,
        deletedAt: moment(),
        deletedBy: req.user.userId,
        isActive : false,
      },
      { where: { id: req.params.id } }
    );

    console.log("Person contact deleted, id:", req.params.id);
    res.status(200).json({ message: "Contact info deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Contact info delete error" });
  }
};

module.exports.getPersonContact = async (req, res) => {
  try {
    // get user specific
    let personID = req.user.personId;

    console.log("Person ID = " + personID);

    let baseQuery = {};

    if (req.query.input) {
      baseQuery["data"] = req.query.input;
    }
    if (req.query.type) {
      baseQuery["type"] = req.query.type;
    }
    if (req.query.verified) {
      baseQuery["verified"] = req.query.verified === "true" ? true : false;
    }

    let pageQuery = {};

    pageQuery["page"] = req.query.page;
    pageQuery["maxRowInPage"] = req.query.maxRowInPage;
    pageQuery["orderBy"] = req.query.orderBy;
    pageQuery["order"] = req.query.order;

    paginate(
      db.PersonContacts,
      [],
      { isActive: true, personId: personID, ...baseQuery },
      pageQuery
    )
      .then((_data) => {
        _data["columns"] = Object.keys(_data?.rows[0]?.dataValues || {});
        res.status(200).json({
          data   : _data,
          message: "Contacts data fetched successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: err, message: "Error to fetch Contacts data" });
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: err, message: "Error to fetch Contacts data" });
  }
};

module.exports.changePrimaryContact = async (req, res) => {
  try {
    let personId = req.user.personId;
    let existingContact = await db.PersonContacts.findOne({
      where: {
        data       : req.body.data,
        primaryFlag: true,
        type       : req.query.type,
      },
    });

    if (existingContact) {
      console.log(
        "Already a primary contact for other person: ",
        existingContact.personId
      );
      res
        .status(500)
        .json({ message: "Already a primary contact for other user" });
    } else {
      let result = await db.sequelize.transaction(async (t) => {
        await db.PersonContacts.update(
          { primaryFlag: false },
          {
            transaction: t,
            where      : {
              personId: personId,
              type    : req.query.type,
            },
          }
        );
        console.log("All contacts made non primary");
        await db.PersonContacts.update(
          { primaryFlag: true },
          {
            transaction: t,
            where      : { id: req.body.id },
          }
        );
        console.log(
          "Contact made primary id:,",
          req.body.id,
          ", contact:",
          req.body.data
        );

        let uData = {};
        let pData = {};

        if (req.query.type == constant.contact.PHONE) {
          uData[constant.contact.PHONE] = req.body.data;
          pData["phoneVerified"] = true;
        }
        if (req.query.type == constant.contact.EMAIL) {
          uData[constant.contact.EMAIL] = req.body.data;
          pData["emailVerified"] = true;
        }

        console.log(
          "U DATA",
          uData,
          "P data:",
          pData,
          "id:",
          req.user.userId
        );
        await db.Users.update(uData, {
          transaction: t,
          where      : { id: req.user.userId },
        });
        await db.Persons.update(pData, {
          transaction: t,
          where      : { id: personId },
        });
        console.log("person table updated");
      });

      console.log("Primary contact updated");
      res.status(200).json({ message: "Primary contact updated" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error to fetch Contacts data" });
  }
}; 

module.exports.postSentOtp = async (req, res) => {
  try {
    let result = await db.sequelize.transaction(async (t) => {
      let userId = req.user.userId;
      let comData = { id: userId };

      let type = null;
      let template = null;

      switch (req.body.type) {
        case COMMUNICATION_EMAIL:
          console.log("Type MAIL");
          comData[constant.contact.EMAIL] = req.body.data;
          type = COMMUNICATION_EMAIL;
          template = constant.communication.SENT_OTP_MAIL_EN;
          break;

        case COMMUNICATION_SMS:
          console.log("Type SMS");
          comData[constant.contact.PHONE] = req.body.data;
          type = COMMUNICATION_SMS;
          template = constant.communication.SENT_OTP_SMS_EN;
          break;

        default:
          console.error("Communication type not implemented", req.body);
          throw "Communication type not implemented";
      }
      console.log("Template", template);
      let comRes = await communicate(
        comData,
        type,
        template,
        (otpFlag = true),
        (transaction = t)
      );

      console.log("otpRes", comRes);
      if (!comRes.success) {
        console.log("OTP sent error");
        throw "OTP SENT ERROR";
      }
    });

    console.log("OTP sent successfully");
    res.status(200).json({ message: "OTP Sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error to fetch Contacts data" });
  }
};

module.exports.postVerifyOtp = async (req, res) => {
  try {
    let personId = req.user.personId;
    let userId = req.user.userId;

    let otpInDb = await db.Otps.findOne({
      where: {
        isActive: true,
        userId  : userId,
      },
    });

    console.log("OTP in db", otpInDb.otp);
    console.log("OTP by user", req.body.otp);

    if (req.body.otp == otpInDb.otp) {
      console.log("OTP matched");
      let [nrows, rows] = await db.PersonContacts.update(
        { verified: true },
        {
          where: {
            data    : req.body.data,
            personId: personId,
          },
        }
      );

      if (nrows > 0) {
        console.log("Person contact updated.");
        console.log("OTP verified");
        res.status(200).json({ message: "OTP verified" });
      } else {
        console.log("Person contact not updated");
        res.status(500).json({ message: "Internal error" });
      }
    } else {
      console.log(
        "OTP mismatch, dbOtp: ",
        otpInDb.otp,
        ",user given otp:",
        req.body.otp
      );
      res.status(500).json({ message: "OTP mismatch" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error to fetch Contacts data" });
  }
}; 

module.exports.setPrimaryContact = async (req, res) => {
  try {
    let allUser = await db.Users.findAll({ include: [{ as: "Person", model: db.Persons }] });
    let result = await db.sequelize.transaction(async (t) => {
      for (let i = 0; i < allUser.length; i++) {
        let u = allUser[i];

        console.log("Doing user", u.id, u.email, u.phone);
        let email = await db.PersonContacts.findOne({
          where: {
            data: u.email,
            type: constant.contact.EMAIL,
          },
        });

        if (!email && u.email) {
          await db.PersonContacts.create(
            {
              data       : u.email,
              personId   : u.Person.id,
              primaryFlag: true,
              type       : constant.contact.EMAIL,
              verified   : u.Person.emailVerified,
            },
            { transaction: t }
          );
        }

        let phone = await db.PersonContacts.findOne({
          where: {
            data: u.phone,
            type: constant.contact.PHONE,
          },
        });

        if (!phone && u.phone) {
          await db.PersonContacts.create(
            {
              data       : u.phone,
              personId   : u.Person.id,
              primaryFlag: true,
              type       : constant.contact.PHONE,
              verified   : u.Person.phoneVerified,
            },
            { transaction: t }
          );
        }
      }
    });

    console.log("Primary contact updated");
    res.status(200).json({ message: "Primary contact updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error to fetch Contacts data" });
  }
}; 

module.exports.getEducations = async (req, res) => {
  try {
    // get user specific
    let userID = req.user.userId;

    console.log("User ID = " + userID);
    let person = await db.Persons.findOne({ where: { userId: userID } });
    let personID = person.id;

    console.log("Person ID = " + personID);

    let baseQuery = {};

    if (req.query.search) {
      baseQuery["search"] = req.query.search;
    }

    let pageQuery = {};

    pageQuery["page"] = req.query.page;
    pageQuery["maxRowInPage"] = req.query.maxRowInPage;
    pageQuery["orderBy"] = req.query.orderBy;
    pageQuery["order"] = req.query.order;

    paginate(
      db.PersonEducations,
      [],
      { isActive: true, personId: personID },
      pageQuery
    )
      .then((_data) => {
        res.status(200).json({
          data   : _data,
          message: "Education data fetched successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: err, message: "Error to fetch education data" });
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: err, message: "Error to fetch education data" });
  }
};

module.exports.getEducation = async (req, res) => {};
module.exports.postEducation = async (req, res) => {};
module.exports.updateEducation = async (req, res) => {};
module.exports.deleteEducation = async (req, res) => {};

module.exports.getExperiences = async (req, res) => {
  try {
    // get user specific
    let userID = req.user.userId;

    console.log("User ID = " + userID);
    let person = await db.Persons.findOne({ where: { userId: userID } });
    let personID = person.id;

    console.log("Person ID = " + personID);

    let baseQuery = {};

    if (req.query.search) {
      baseQuery["search"] = req.query.search;
    }

    let pageQuery = {};

    pageQuery["page"] = req.query.page;
    pageQuery["maxRowInPage"] = req.query.maxRowInPage;
    pageQuery["orderBy"] = req.query.orderBy;
    pageQuery["order"] = req.query.order;

    paginate(
      db.PersonExperiences,
      [],
      { isActive: true, personId: personID },
      pageQuery
    )
      .then((_data) => {
        res.status(200).json({
          data   : _data,
          message: "Experience data fetched successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: err, message: "Error to fetch experience data" });
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: err, message: "Error to fetch experience data" });
  }
};

module.exports.getExperience = async (req, res) => {};
module.exports.postExperience = async (req, res) => {};
module.exports.updateEducation = async (req, res) => {};
module.exports.deleteExperience = async (req, res) => {};

module.exports.postDoctorsDetails = async (req, res) => {
  try {
    let del_urls = [];
    let personId = req.params.id;

    let out = await upload.fields([{ maxCount: 1, name: "registrationDocument" }])(req, res, async function (err) {
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

            let d = await db.DoctorDetails.findOne({ where: { personId: req.params.id } });

            del_urls.push(url);
            if (d) {
              throw 290004;
            }
            let data = req.body;
            let result = await db.sequelize.transaction(async (t) => {
              data.personDocs = [];
              let documentDetail = await db.PersonDocs.create(
                {
                  createdBy: req.user.userId,
                  personId : personId,
                  type     : "Registration Document",
                  updatedBy: req.user.userId,
                  url      : file_url,
                },
                { transaction: t }
              );

              let docDetail = await db.DoctorDetails.create(
                {
                  ...req.body,
                  createdBy: req.user.userId,
                  doctorId : personId,
                  updatedBy: req.user.userId,
                },
                { transaction: t }
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
    await deleteS3FIle(del_urls);
    res.status(500).json({ message: messageProcessor(err) });
  }
};
module.exports.updateDoctorsDetails = async (req, res) => {
  try {
    let del_urls = [];
    let file_url = null;
    let personId = req.params.id;

    let out = await upload.fields([{ maxCount: 1, name: "registrationDocument" }])(req, res, async function (err) {
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

          let d = await db.DoctorDetails.findOne({ where: { doctorId: req.params.id } });

          del_urls.push(file_url);

          let data = req.body;
          let result = await db.sequelize.transaction(async (t) => {
            data.personDocs = [];

            if (!d) {
              console.log("Docotr details not found");
              let docDetail = await db.DoctorDetails.create(
                {
                  ...data,
                  doctorId : personId,
                  updatedBy: req.user.userId,
                },
                { transaction: t }
              );
            } else {
              console.log("Docotr details found: ", d.id);
            }

            if (file_url) {
              let [nrows, rows] = await db.PersonDocs.update(
                {
                  docUrl   : file_url,
                  updatedBy: req.user.userId,
                },
                {
                  transaction: t,
                  where      : { personId: personId },
                }
              );

              if (nrows == 0) {
                let nPersonDocs = await db.PersonDocs.create(
                  {
                    docUrl   : file_url,
                    personId,
                    type     : "Registration Document",
                    updatedBy: req.user.userId,
                  },
                  { transaction: t }
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
              let docDetail = await db.Persons.update(
                {
                  departmentId: data.departmentId,
                  updatedBy   : req.user.userId,
                },
                {
                  transaction: t,
                  where      : { id: personId },
                }
              );

              console.log("Department updated");
            }

            let docDetail = await db.DoctorDetails.update(
              {
                ...data,
                updatedBy: req.user.userId,
              },
              {
                transaction: t,
                where      : { doctorId: personId },
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
    await deleteS3FIle(del_urls);
    res.status(500).json({ message: messageProcessor(err) });
  }
};
module.exports.updateBasicDetails = async (req, res) => {
  try {
    let del_urls = [];
    let file_url = null;
    let personId = req.params.id;

    let out = await upload.fields([{ maxCount: 1, name: "photo" }])(
      req,
      res,
      async function (err) {
        try {
          if (err) {
            console.log("FIle Upload error", err);
            throw err;
          } else {
            let data = req.body;

            if (data.extraInfo) data.extraInfo = JSON.parse(data.extraInfo);
            if (data.bio) data["extraInfo"] = { bio: data.bio };
            if (req.files["photo"] && req.files["photo"][0]) {
              file_url = await getUrl(
                req.files["photo"][0].filename
                  ? req.files["photo"][0].filename
                  : req.files["photo"][0].key
                    ? req.files["photo"][0].key
                    : req.files["photo"][0].originalname
              );
              del_urls.push(file_url);
              data.photoUrl = file_url;
            }
            console.log("UPDATEING DATA", data);
            let result = await db.sequelize.transaction(async (t) => {
              let docDetail = await db.Persons.update(
                {
                  ...data,
                  updatedBy: req.user.userId,
                },
                {
                  transaction: t,
                  where      : { id: personId },
                }
              );
            });

            console.log("Basic detail updated");
            res.status(200).json({ message: messageProcessor(200004) });
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
    await deleteS3FIle(del_urls);
    res.status(500).json({ message: messageProcessor(err) });
  }
};
module.exports.postAddress = async (req, res) => {
  try {
    let del_urls = [];
    let personId = req.params.id;

    let out = await upload.fields([{ maxCount: 1, name: "clinicLogo" }])(
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
            let result = await db.sequelize.transaction(async (t) => {
              let ob = {};
              let address = await db.AddressTypes.findByPk(
                data.addressTypeId
              );
              let addDetail = await db.PersonAddresses.create(
                {
                  ...data,
                  _status  : entityStatus.ACTIVE,
                  createdBy: req.user.userId,
                  personId : personId,
                  updatedBy: req.user.userId,
                },
                { transaction: t }
              );

              ob["addressId"] = addDetail.id;

              if (address?.type?.toLowerCase() === "clinic") {
                let clinicDetail = await db.Clinics.create(
                  {
                    _status        : entityStatus.ACTIVE,
                    createdBy      : req.user.userId,
                    name           : data.fullName,
                    personAddressId: addDetail.id,
                    photoUrl       : file_url,
                    updatedBy      : req.user.userId,
                  },
                  { transaction: t }
                );

                ob["clinicId"] = clinicDetail.id;
              }

              return ob;
            });

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
    await deleteS3FIle(del_urls);
    res.status(500).json({ message: messageProcessor(err) });
  }
};
module.exports.updateAddress = async (req, res) => {
  try {
    let del_urls = [];
    let addressId = req.params.id;
    let file_url = null;
    let out = await upload.fields([{ maxCount: 1, name: "clinicLogo" }])(
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
            let result = await db.sequelize.transaction(async (t) => {
              let address = await db.PersonAddresses.findByPk(
                req.params.id,
                { include: [{ model: db.AddressTypes }] }
              );
              let [nrows, rows] = await db.PersonAddresses.update(
                {
                  ...data,
                  updatedBy: req.user.userId,
                },
                {
                  transaction: t,
                  where      : { id: addressId },
                }
              );

              if (nrows == 0) {
                throw 290007;
              }

              if (address?.AddressType?.type?.toLowerCase() === "clinic") {
                console.log("Clinic Url", file_url);
                let ob = {
                  name     : data.fullName,
                  updatedBy: req.user.userId,
                };

                if (file_url) {
                  ob["photoUrl"] = file_url;
                }
                let [nrows, rows] = await db.Clinics.update(ob, {
                  transaction: t,
                  where      : { personAddressId: addressId },
                });

                if (nrows === 0) {
                  throw 290008;
                }
              }
            });

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
    await deleteS3FIle(del_urls);
    res.status(500).json({ message: messageProcessor(err) });
  }
};
module.exports.deleteAddress = async (req, res) => {
  try {
    let result = await db.sequelize.transaction(async (t) => {
      let addressId = req.params.id;
      let address = await db.PersonAddresses.findByPk(addressId, { include: [{ model: db.AddressTypes }] });

      let [nrows, rows] = await db.PersonAddresses.update(
        {
          _status  : entityStatus.DELETED,
          isActive : false,
          updatedBy: req.user.userId,
        },
        {
          transaction: t,
          where      : { id: addressId },
        }
      );

      if (nrows == 0) {
        console.error("Error here address");
        throw 290009;
      }

      if (address?.AddressType?.type?.toLowerCase() === "clinic") {
        let [nrows, rows] = await db.Clinics.update(
          {
            isActive : false,
            updatedBy: req.user.userId,
          },
          {
            transaction: t,
            where      : { personAddressId: addressId },
          }
        );

        if (nrows === 0) {
          console.error("Error here clinic");
          throw 290009;
        }
      }
    });

    console.log("Address deleted: ", req.params.id);
    res.status(200).json({ message: messageProcessor(200007) });
  } catch (error) {
    console.log("Address Delete error", error);
    res.status(500).json({ message: messageProcessor(error) });
  }
};
module.exports.postEducation = async (req, res) => {
  try {
    let data = req.body;
    let personId = req.params.id;
    let result = await db.sequelize.transaction(async (t) => {
      if (data.isCurrent) {
        data.endDate = null;
      }
      let addDetail = await db.PersonEducations.create(
        {
          ...data,
          _status  : entityStatus.ACTIVE,
          createdBy: req.user.userId,
          personId : personId,
          updatedBy: req.user.userId,
        },
        { transaction: t }
      );

      return addDetail.id;
    });

    console.log("Education created", result);
    res.status(200).json({ message: messageProcessor(200008) });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: messageProcessor(err) });
  }
}; 
module.exports.updateEducation = async (req, res) => {
  try {
    let data = req.body;

    if (data.isCurrent) {
      data.endDate = null;
    }
    let result = await db.sequelize.transaction(async (t) => {
      let [nrows, rows] = await db.PersonEducations.update(
        {
          ...data,
          updatedBy: req.user.userId,
        },
        {
          transaction: t,
          where      : { id: req.params.id },
        }
      );

      if (nrows == 0) {
        throw 200009;
      }
    });

    console.log("Education detail updated");
    res.status(200).json({ message: messageProcessor(200009) });
  } catch (err) {
    console.log(err);
    await deleteS3FIle(del_urls);
    res.status(500).json({ message: messageProcessor(err) });
  }
};
module.exports.deleteEducation = async (req, res) => {
  try {
    let educationId = req.params.id;
    let result = await db.sequelize.transaction(async (t) => {
      let [nrows, rows] = await db.PersonEducations.update(
        {
          _status  : entityStatus.DELETED,
          isActive : false,
          updatedBy: req.user.userId,
        },
        {
          transaction: t,
          where      : { id: educationId },
        }
      );

      if (nrows == 0) {
        throw 290012;
      }
    });

    console.log("education deleted: ", req.params.id);
    res.status(200).json({ message: messageProcessor(200010) });
  } catch (error) {
    console.log("education Delete error", error);
    res.status(500).json({ message: messageProcessor(error) });
  }
};
module.exports.postExperience = async (req, res) => {
  try {
    let data = req.body;
    let personId = req.params.id;
    let result = await db.sequelize.transaction(async (t) => {
      if (data.isCurrent) {
        data.endDate = null;
      }
      let addDetail = await db.PersonExperiences.create(
        {
          ...data,
          _status  : entityStatus.ACTIVE,
          createdBy: req.user.userId,
          personId : personId,
          updatedBy: req.user.userId,
        },
        { transaction: t }
      );

      return addDetail.id;
    });

    console.log("Experience created", result);
    res.status(200).json({ message: messageProcessor(200011) });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: messageProcessor(290013) });
  }
};
module.exports.updateExperience = async (req, res) => {
  try {
    let data = req.body;

    if (data.isCurrent) {
      data.endDate = null;
    }
    let result = await db.sequelize.transaction(async (t) => {
      let [nrows, rows] = await db.PersonExperiences.update(
        {
          ...data,
          updatedBy: req.user.userId,
        },
        {
          transaction: t,
          where      : { id: req.params.id },
        }
      );

      if (nrows == 0) {
        throw 290014;
      }
    });

    console.log("Experiences detail updated");
    res.status(200).json({ message: messageProcessor(200012) });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: messageProcessor(290014) });
  }
}; 
module.exports.deleteExperience = async (req, res) => {
  try {
    let result = await db.sequelize.transaction(async (t) => {
      let experienceId = req.params.id;
      let [nrows, rows] = await db.PersonExperiences.update(
        {
          _status  : entityStatus.DELETED,
          isActive : false,
          updatedBy: req.user.userId,
        },
        {
          transaction: t,
          where      : { id: experienceId },
        }
      );

      if (nrows == 0) {
        throw 290015;
      }
    });

    console.log("Experiences deleted: ", req.params.id);
    res.status(200).json({ message: messageProcessor(200013) });
  } catch (error) {
    console.log("education Delete error", error);
    res.status(500).json({ message: messageProcessor(290015) });
  }
};
module.exports.getProfileCompletion = async (req, res) => {
  try {
    let profile = await db.Persons.findByPk(req.params.id, {
      include: [
        {
          as   : "User",
          model: db.Users,
        },
        {
          include : [{ model: db.AddressTypes }, { model: db.Clinics }],
          model   : db.PersonAddresses,
          required: false,
          where   : { isActive: true },
        },
        {
          model   : db.PersonEducations,
          required: false,
          where   : { isActive: true },
        },
        {
          model   : db.PersonExperiences,
          required: false,
          where   : { isActive: true },
        },
        { model: db.PersonDocs },
        { model: db.DoctorDetails },
      ],
    });
    const role = await db.Roles.findByPk(profile.User.roleId);
    const completion = await calculateCompletion(profile, role);

    res.status(200).json({
      data   : 100 * (completion.present / completion.total),
      message: "Profile completion calculated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch profile completion" });
    console.log(err);
  }
};

