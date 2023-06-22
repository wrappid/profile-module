
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
            model: db.Persons,
            as: "Persons",
            where: { userId: userID },
          },
        ],
      });

      let personDocs = doctorDetails
        ? await db.PersonDocs.findOne({
            where: {
              personId: doctorDetails?.dataValues?.Persons?.id,
              type: "Registration Document",
            },
          })
        : null;

      var temp = { ...doctorDetails?.dataValues };
      delete temp.Persons;
      temp["departmentId"] = doctorDetails?.dataValues?.Persons?.departmentId;
      temp["registrationDocument"] = personDocs?.docUrl;

      doctorDetails
        ? res.status(200).json({
            message: "Registration info fetched successfully",
            data: temp,
          })
        : res
            .status(204)
            .json({ message: "Person registration info not found" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error while fetch person registration info data",
        error: err,
      });
    }
  }

module.exports.getContactInfo = async (req ,res) => {
  try {
    let personId = req.user.personId;
    var exists = await db.PersonContacts.findOne({
      where: {
        data: req.body.data.toString(),
        personId: personId,
      },
    });
    if (exists) {
      console.log("Contact already exists", exists.id);
      res.status(500).json({
        message: "Contact already exists",
      });
    } else {
      var createdContact = await db.PersonContacts.create({
        ...req.body,
        type: isNaN(req.body.data)
          ? constant.contact.EMAIL
          : constant.contact.PHONE,
        _status: entityStatus.ACTIVE,
        personId: personId,
      });
      console.log(
        "Person contact created, id:",
        createdContact.id,
        ", Person Id: ",
        personId
      );
      res.status(200).json({
        message: "Contact info created successfully",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Contact info create error",
      error: err,
    });
  }
}


module.exports.postContact = async (req ,res) => {
  try {
    let personId = req.user.personId;
    var exists = await db.PersonContacts.findOne({
      where: {
        data: req.body.data.toString(),
        personId: personId,
      },
    });
    if (exists) {
      console.log("Contact already exists", exists.id);
      res.status(500).json({
        message: "Contact already exists",
      });
    } else {
      var createdContact = await db.PersonContacts.create({
        ...req.body,
        type: isNaN(req.body.data)
          ? constant.contact.EMAIL
          : constant.contact.PHONE,
        _status: entityStatus.ACTIVE,
        personId: personId,
      });
      console.log(
        "Person contact created, id:",
        createdContact.id,
        ", Person Id: ",
        personId
      );
      res.status(200).json({
        message: "Contact info created successfully",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Contact info create error",
      error: err,
    });
  }
}

module.exports.updateContact = async (req ,res) => {
  try {
    var contact = await db.PersonContacts.findByPk(req.params.id);
    if (contact.primaryFlag) {
      console.log("Can not delete primary mail");
      res.status(500).json({
        message:
          "Can not delete primary contact. Change primary then try again",
      });
    }
    var [nrows, rows] = await db.PersonContacts.update(
      {
        isActive: false,
        _status: entityStatus.DELETED,
        deletedAt: moment(),
        deletedBy: req.user.userId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    console.log("Person contact deleted, id:", req.params.id);
    res.status(200).json({
      message: "Contact info deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Contact info delete error",
    });
  }
}

module.exports.getPersonContact = async (req ,res) => {
  try {
    // get user specific
    let personID = req.user.personId;
    console.log("Person ID = " + personID);

    var baseQuery = {};
    if (req.query.input) {
      baseQuery["data"] = req.query.input;
    }
    if (req.query.type) {
      baseQuery["type"] = req.query.type;
    }
    if (req.query.verified) {
      baseQuery["verified"] = req.query.verified === "true" ? true : false;
    }

    var pageQuery = {};
    pageQuery["page"] = req.query.page;
    pageQuery["maxRowInPage"] = req.query.maxRowInPage;
    pageQuery["orderBy"] = req.query.orderBy;
    pageQuery["order"] = req.query.order;

    paginate(
      db.PersonContacts,
      [],
      { personId: personID, isActive: true, ...baseQuery },
      pageQuery
    )
      .then((_data) => {
        _data["columns"] = Object.keys(_data?.rows[0]?.dataValues || {});
        res.status(200).json({
          message: "Contacts data fetched successfully",
          data: _data,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: "Error to fetch Contacts data", error: err });
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error to fetch Contacts data", error: err });
  }
}

module.exports.changePrimaryContact = async (req ,res) => {
  try {
    var personId = req.user.personId;
    var existingContact = await db.PersonContacts.findOne({
      where: {
        type: req.query.type,
        data: req.body.data,
        primaryFlag: true,
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
      var result = await db.sequelize.transaction(async (t) => {
        await db.PersonContacts.update(
          { primaryFlag: false },
          {
            where: {
              personId: personId,
              type: req.query.type,
            },
            transaction: t,
          }
        );
        console.log("All contacts made non primary");
        await db.PersonContacts.update(
          { primaryFlag: true },
          {
            where: {
              id: req.body.id,
            },
            transaction: t,
          }
        );
        console.log(
          "Contact made primary id:,",
          req.body.id,
          ", contact:",
          req.body.data
        );

        var uData = {};
        var pData = {};
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
          where: {
            id: req.user.userId,
          },
          transaction: t,
        });
        await db.Persons.update(pData, {
          where: {
            id: personId,
          },
          transaction: t,
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
} 

module.exports.postSentOtp = async (req ,res) => {
  try {
    var result = await db.sequelize.transaction(async (t) => {
      var userId = req.user.userId;
      var comData = { id: userId };

      var type = null;
      var template = null;
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
      var comRes = await communicate(
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
}

module.exports.postVerifyOtp = async (req ,res) => {
  try {
    var personId = req.user.personId;
    var userId = req.user.userId;

    var otpInDb = await db.Otps.findOne({
      where: {
        userId: userId,
        isActive: true,
      },
    });

    console.log("OTP in db", otpInDb.otp);
    console.log("OTP by user", req.body.otp);

    if (req.body.otp == otpInDb.otp) {
      console.log("OTP matched");
      var [nrows, rows] = await db.PersonContacts.update(
        { verified: true },
        {
          where: {
            personId: personId,
            data: req.body.data,
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
} 

module.exports.setPrimaryContact = async (req ,res) => {
  try {
    var allUser = await db.Users.findAll({
      include: [{ model: db.Persons, as: "Person" }],
    });
    var result = await db.sequelize.transaction(async (t) => {
      for (var i = 0; i < allUser.length; i++) {
        var u = allUser[i];
        console.log("Doing user", u.id, u.email, u.phone);
        var email = await db.PersonContacts.findOne({
          where: {
            data: u.email,
            type: constant.contact.EMAIL,
          },
        });
        if (!email && u.email) {
          await db.PersonContacts.create(
            {
              primaryFlag: true,
              type: constant.contact.EMAIL,
              data: u.email,
              personId: u.Person.id,
              verified: u.Person.emailVerified,
            },
            {
              transaction: t,
            }
          );
        }

        var phone = await db.PersonContacts.findOne({
          where: {
            data: u.phone,
            type: constant.contact.PHONE,
          },
        });
        if (!phone && u.phone) {
          await db.PersonContacts.create(
            {
              primaryFlag: true,
              type: constant.contact.PHONE,
              data: u.phone,
              personId: u.Person.id,
              verified: u.Person.phoneVerified,
            },
            {
              transaction: t,
            }
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
} 

module.exports.getEducations = async (req ,res) => {
  try {
    // get user specific
    let userID = req.user.userId;
    console.log("User ID = " + userID);
    let person = await db.Persons.findOne({ where: { userId: userID } });
    let personID = person.id;
    console.log("Person ID = " + personID);

    var baseQuery = {};
    if (req.query.search) {
      baseQuery["search"] = req.query.search;
    }

    var pageQuery = {};
    pageQuery["page"] = req.query.page;
    pageQuery["maxRowInPage"] = req.query.maxRowInPage;
    pageQuery["orderBy"] = req.query.orderBy;
    pageQuery["order"] = req.query.order;

    paginate(
      db.PersonEducations,
      [],
      { personId: personID, isActive: true },
      pageQuery
    )
      .then((_data) => {
        res.status(200).json({
          message: "Education data fetched successfully",
          data: _data,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: "Error to fetch education data", error: err });
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error to fetch education data", error: err });
  }
}

module.exports.getEducation = async (req ,res) => {}
module.exports.postEducation = async (req ,res) => {}
module.exports.updateEducation = async (req ,res) => {}
module.exports.deleteEducation = async (req ,res) => {}

module.exports.getExperiences = async (req,res) => {
  try {
    // get user specific
    let userID = req.user.userId;
    console.log("User ID = " + userID);
    let person = await db.Persons.findOne({ where: { userId: userID } });
    let personID = person.id;
    console.log("Person ID = " + personID);

    var baseQuery = {};
    if (req.query.search) {
      baseQuery["search"] = req.query.search;
    }

    var pageQuery = {};
    pageQuery["page"] = req.query.page;
    pageQuery["maxRowInPage"] = req.query.maxRowInPage;
    pageQuery["orderBy"] = req.query.orderBy;
    pageQuery["order"] = req.query.order;

    paginate(
      db.PersonExperiences,
      [],
      { personId: personID, isActive: true },
      pageQuery
    )
      .then((_data) => {
        res.status(200).json({
          message: "Experience data fetched successfully",
          data: _data,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: "Error to fetch experience data", error: err });
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error to fetch experience data", error: err });
  }
}

module.exports.getExperience = async (req,res) => {}
module.exports.postExperience = async (req,res) => {}
module.exports.updateEducation = async (req,res) => {}
module.exports.deleteExperience = async (req,res) => {}



module.exports.postDoctorsDetails = async (req,res) => {
  try {
    var del_urls = [];
    var personId = req.params.id;

    var out = await upload.fields([
      { name: "registrationDocument", maxCount: 1 },
    ])(req, res, async function (err) {
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

            var d = await db.DoctorDetails.findOne({
              where: {
                personId: req.params.id,
              },
            });

            del_urls.push(url);
            if (d) {
              throw 290004;
            }
            var data = req.body;
            var result = await db.sequelize.transaction(async (t) => {
              data.personDocs = [];
              var documentDetail = await db.PersonDocs.create(
                {
                  type: "Registration Document",
                  url: file_url,
                  personId: personId,
                  createdBy: req.user.userId,
                  updatedBy: req.user.userId,
                  updatedBy: req.user.userId,
                },
                { transaction: t }
              );

              var docDetail = await db.DoctorDetails.create(
                {
                  ...req.body,
                  doctorId: personId,
                  createdBy: req.user.userId,
                  updatedBy: req.user.userId,
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
}
module.exports.updateDoctorsDetails = async (req,res) => {
  try {
    var del_urls = [];
    var file_url = null;
    var personId = req.params.id;

    var out = await upload.fields([
      { name: "registrationDocument", maxCount: 1 },
    ])(req, res, async function (err) {
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

          var d = await db.DoctorDetails.findOne({
            where: {
              doctorId: req.params.id,
            },
          });

          del_urls.push(file_url);

          var data = req.body;
          var result = await db.sequelize.transaction(async (t) => {
            data.personDocs = [];

            if (!d) {
              console.log("Docotr details not found");
              var docDetail = await db.DoctorDetails.create(
                {
                  ...data,
                  doctorId: personId,
                  updatedBy: req.user.userId,
                },
                {
                  transaction: t,
                }
              );
            } else {
              console.log("Docotr details found: ", d.id);
            }

            if (file_url) {
              var [nrows, rows] = await db.PersonDocs.update(
                {
                  docUrl: file_url,
                  updatedBy: req.user.userId,
                },
                {
                  where: {
                    personId: personId,
                  },
                  transaction: t,
                }
              );
              if (nrows == 0) {
                let nPersonDocs = await db.PersonDocs.create(
                  {
                    docUrl: file_url,
                    type: "Registration Document",
                    personId,
                    updatedBy: req.user.userId,
                  },
                  {
                    transaction: t,
                  }
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
              var docDetail = await db.Persons.update(
                {
                  departmentId: data.departmentId,
                  updatedBy: req.user.userId,
                },
                {
                  where: {
                    id: personId,
                  },
                  transaction: t,
                }
              );
              console.log("Department updated");
            }

            var docDetail = await db.DoctorDetails.update(
              {
                ...data,
                updatedBy: req.user.userId,
              },
              {
                where: {
                  doctorId: personId,
                },
                transaction: t,
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
}
module.exports.updateBasicDetails = async (req,res) => {
  try {
    var del_urls = [];
    var file_url = null;
    var personId = req.params.id;

    var out = await upload.fields([{ name: "photo", maxCount: 1 }])(
      req,
      res,
      async function (err) {
        try {
          if (err) {
            console.log("FIle Upload error", err);
            throw err;
          } else {
            var data = req.body;
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
            var result = await db.sequelize.transaction(async (t) => {
              var docDetail = await db.Persons.update(
                {
                  ...data,
                  updatedBy: req.user.userId,
                },
                {
                  where: {
                    id: personId,
                  },
                  transaction: t,
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
}
module.exports.postAddress = async (req,res) => {
  try {
    var del_urls = [];
    var personId = req.params.id;

    var out = await upload.fields([{ name: "clinicLogo", maxCount: 1 }])(
      req,
      res,
      async function (err) {
        try {
          if (err) {
            console.log("FIle Upload error", err);
            throw err;
          } else {
            var data = req.body;
            var file_url = null;

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
            var result = await db.sequelize.transaction(async (t) => {
              var ob = {};
              var address = await db.AddressTypes.findByPk(
                data.addressTypeId
              );
              var addDetail = await db.PersonAddresses.create(
                {
                  ...data,
                  personId: personId,
                  createdBy: req.user.userId,
                  updatedBy: req.user.userId,
                  updatedBy: req.user.userId,
                  _status: entityStatus.ACTIVE,
                },
                { transaction: t }
              );
              ob["addressId"] = addDetail.id;

              if (address?.type?.toLowerCase() === "clinic") {
                var clinicDetail = await db.Clinics.create(
                  {
                    name: data.fullName,
                    photoUrl: file_url,
                    personAddressId: addDetail.id,
                    createdBy: req.user.userId,
                    updatedBy: req.user.userId,
                    updatedBy: req.user.userId,
                    _status: entityStatus.ACTIVE,
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
}
module.exports.updateAddress = async (req,res) => {
  try {
    var del_urls = [];
    var addressId = req.params.id;
    var file_url = null;
    var out = await upload.fields([{ name: "clinicLogo", maxCount: 1 }])(
      req,
      res,
      async function (err) {
        try {
          if (err) {
            console.log("FIle Upload error", err);
            throw err;
          } else {
            var data = req.body;

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
            var result = await db.sequelize.transaction(async (t) => {
              var address = await db.PersonAddresses.findByPk(
                req.params.id,
                {
                  include: [{ model: db.AddressTypes }],
                }
              );
              var [nrows, rows] = await db.PersonAddresses.update(
                {
                  ...data,
                  updatedBy: req.user.userId,
                },
                {
                  where: { id: addressId },
                  transaction: t,
                }
              );
              if (nrows == 0) {
                throw 290007;
              }

              if (address?.AddressType?.type?.toLowerCase() === "clinic") {
                console.log("Clinic Url", file_url);
                var ob = {
                  name: data.fullName,
                  updatedBy: req.user.userId,
                };
                if (file_url) {
                  ob["photoUrl"] = file_url;
                }
                var [nrows, rows] = await db.Clinics.update(ob, {
                  where: { personAddressId: addressId },
                  transaction: t,
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
}
module.exports.deleteAddress = async (req,res) =>  {
  try {
    var result = await db.sequelize.transaction(async (t) => {
      var addressId = req.params.id;
      var address = await db.PersonAddresses.findByPk(addressId, {
        include: [{ model: db.AddressTypes }],
      });

      var [nrows, rows] = await db.PersonAddresses.update(
        {
          isActive: false,
          updatedBy: req.user.userId,
          _status: entityStatus.DELETED,
        },
        {
          where: { id: addressId },
          transaction: t,
        }
      );
      if (nrows == 0) {
        console.error("Error here address");
        throw 290009;
      }

      if (address?.AddressType?.type?.toLowerCase() === "clinic") {
        var [nrows, rows] = await db.Clinics.update(
          {
            isActive: false,
            updatedBy: req.user.userId,
          },
          {
            where: { personAddressId: addressId },
            transaction: t,
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
}
module.exports.postEducation = async (req,res) => {
  try {
    var data = req.body;
    var personId = req.params.id;
    var result = await db.sequelize.transaction(async (t) => {
      if (data.isCurrent) {
        data.endDate = null;
      }
      var addDetail = await db.PersonEducations.create(
        {
          ...data,
          personId: personId,
          createdBy: req.user.userId,
          updatedBy: req.user.userId,
          updatedBy: req.user.userId,
          _status: entityStatus.ACTIVE,
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
} 
module.exports.updateEducation = async (req,res) => {
  try {
    var data = req.body;
    if (data.isCurrent) {
      data.endDate = null;
    }
    var result = await db.sequelize.transaction(async (t) => {
      var [nrows, rows] = await db.PersonEducations.update(
        {
          ...data,
          updatedBy: req.user.userId,
        },
        {
          where: { id: req.params.id },
          transaction: t,
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
}
module.exports.deleteEducation = async (req,res) => {
  try {
    var educationId = req.params.id;
    var result = await db.sequelize.transaction(async (t) => {
      var [nrows, rows] = await db.PersonEducations.update(
        {
          isActive: false,
          _status: entityStatus.DELETED,
          updatedBy: req.user.userId,
        },
        {
          where: { id: educationId },
          transaction: t,
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
}
module.exports.postExperience = async (req,res) => {
  try {
    var data = req.body;
    var personId = req.params.id;
    var result = await db.sequelize.transaction(async (t) => {
      if (data.isCurrent) {
        data.endDate = null;
      }
      var addDetail = await db.PersonExperiences.create(
        {
          ...data,
          personId: personId,
          createdBy: req.user.userId,
          updatedBy: req.user.userId,
          updatedBy: req.user.userId,
          _status: entityStatus.ACTIVE,
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
}
module.exports.updateExperience = async (req,res) =>  {
  try {
    var data = req.body;
    if (data.isCurrent) {
      data.endDate = null;
    }
    var result = await db.sequelize.transaction(async (t) => {
      var [nrows, rows] = await db.PersonExperiences.update(
        {
          ...data,
          updatedBy: req.user.userId,
        },
        {
          where: { id: req.params.id },
          transaction: t,
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
} 
module.exports.deleteExperience = async (req,res) => {
  try {
    var result = await db.sequelize.transaction(async (t) => {
      var experienceId = req.params.id;
      var [nrows, rows] = await db.PersonExperiences.update(
        {
          isActive: false,
          updatedBy: req.user.userId,
          _status: entityStatus.DELETED,
        },
        {
          where: { id: experienceId },
          transaction: t,
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
}
module.exports.getProfileCompletion = async (req,res) => {
  try {
    var profile = await db.Persons.findByPk(req.params.id, {
      include: [
        {
          model: db.Users,
          as: "User",
        },
        {
          model: db.PersonAddresses,
          where: { isActive: true },
          required: false,
          include: [
            {
              model: db.AddressTypes,
            },
            {
              model: db.Clinics,
            },
          ],
        },
        {
          model: db.PersonEducations,
          where: { isActive: true },
          required: false,
        },
        {
          model: db.PersonExperiences,
          where: { isActive: true },
          required: false,
        },
        { model: db.PersonDocs },
        { model: db.DoctorDetails },
      ],
    });
    const role = await db.Roles.findByPk(profile.User.roleId);
    const completion = await calculateCompletion(profile, role);
    res.status(200).json({
      message: "Profile completion calculated successfully",
      data: 100 * (completion.present / completion.total),
    });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch profile completion" });
    console.log(err);
  }
}


