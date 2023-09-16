const { databaseActions, databaseProvider } = require("@wrappid/service-core");
let multer = require("multer");
const multerS3 = require("multer-s3");
const upload = require("./profile.helper").upload;





const getContactInfoFunc = async (req, res) => {
  try {
    let userID = req.user.userId;
    console.log("User ID = " + userID);

    let userDetails = await databaseActions.findOne("application", "Users", {
      where: { id: userID },
      include: [
        {
          model: databaseProvider.application.models.Persons,
          as: "Person",
        },
      ],
    });
    let data = {
      email: userDetails.email,
      emailVerified: userDetails?.Person?.emailVerified,
      phone: userDetails?.phone,
      phoneVerified: userDetails?.Person?.phoneVerified,
      profileId: userDetails?.Person?.profileId,
      website: userDetails?.Person?.website,
    };
    console.log("Contact info fetched successfully");
    return { status: 200, message: "Contact info fetched successfully", data };
  } catch (err) {
    throw err;
  }
};

const getAddressTypeFunc = async (req, res) => {
  try {
    let data = await databaseActions.findAll("application", "AddressTypes", {
      attributes: ["id", "type"],
    });
    if (data.length > 1) {
      console.log("Address types fetched successfully");
      return {
        status: 200,
        message: "Address types fetched successfully",
        data,
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getDepartmentFunc = async (req, res) => {
  try {
    // let isValidJOI = await authenticateJOI(req, "departmentGET", ["query"]);
    let data = await databaseActions.findAll("application", "Departments", {
      where: { ...req.query },
    });
    if (data.length > 1) {
      console.log("Departments fetched successfully");
      return {
        status: 200,
        message: "Departments fetched successfully",
        data,
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};


const getPersonContactsFunc = async (req, res) => {
  try {
    let person = await databaseActions.findOne("application", "Persons", {
      where: {
        userId: req.user.userId
      }
    })
    let personId = person.id;
    let contactType = req.params.contactType;
    let personContacts = await databaseActions.findAll("application", "PersonContacts", {
      where: {
        personId: personId,
        type: contactType,
        verified: true,
      },
    });

    if (personContacts && personContacts.length > 0) {
      // send 200
      console.log("Contact info fetched successfully");
      return {
        status: 204,
        message: "Contact info fetched successfully",
        data: {
          rows: personContacts
        },
      };

    } else {
      // send 204
      return {
        status: 204,
        message: `No ${contactType}(s) found.`,
      };
    }
  } catch (err) {
    console.log(err);
    throw err
  }
}


const putBasicDetailsFunc = async (req, res) => {
  try {
    let del_urls = [];
    let file_url = null;
    let personId = req.params.id;

    let data = req.body;
    if (data.extraInfo) data.extraInfo = JSON.parse(data.extraInfo);
    if (data.bio) data["extraInfo"] = { bio: data.bio };
    if (req.file["photo"] && req.file["photo"][0]) {
      file_url = await getUrl(
        req.file["photo"].filename
          ? req.file["photo"].filename
          : req.file["photo"].key
            ? req.file["photo"].key
            : req.file["photo"].originalname
      );
      del_urls.push(file_url);
      data.photoUrl = file_url;
    }
    console.log(data.photoUrl);
    console.log("UPDATEING DATA", data);
    let result = await databaseProvider.application.sequelize.transaction(async (t) => {
      let docDetail = await databaseActions.update("application", "Persons",
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

    return { status: 200, message: "Basic details updated" }
  } catch (err) {
    console.log(err);
    return { status: 500, message: err };

    // res.status(500).json({ message: messageProcessor(err) });
  }

};



const getRegistrationInfoFunc = async (req, res) => {
  try {
    let userID = req.user.userId;

    console.log("User ID = " + userID);

    /**
       * TODO: put another model data to patient if required
       */
    let doctorDetails = await databaseActions.findOne("application","DoctorDetails",{
      include: [
        {
          as   : "Persons",
          model: databaseProvider.application.models.Persons,
          where: { userId: userID },
        },
      ],
    });

    let personDocs = doctorDetails
      ? await databaseActions.findOne("application","PersonDocs",{
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

    // doctorDetails
    //   ? res.status(200).json({
    //     data   : temp,
    //     message: "Registration info fetched successfully",
    //   })
    //   : res
    //     .status(204)
    //     .json({ message: "Person registration info not found" });

    if(doctorDetails){
      return {status: 200, message: "Registration info fetched successfully", data : temp}
    } else{
      return {status:204, message: "Person registration info not found" }
    }   
  } catch (err) {
    console.error(err);
    return{
      error  : err,
      message: "Error while fetch person registration info data",
    }
  }
};


/*
const putRegistrationDetailsFunc = async(req, res) => {
  try {
    let del_urls = [];
    let file_url = null;
    let personId = req.params.id;

    let out = await upload.fields([
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

          let d = await databaseActions.findOne("application","DoctorDetails",{
            where: {
              doctorId: req.params.id,
            },
          });

          del_urls.push(file_url);

          let data = req.body;
          let result = await databaseProvider.sequelize.transaction(async (t) => {
            data.personDocs = [];

            if (!d) {
              console.log("Docotr details not found");
              let docDetail = await db.DoctorDetails.create(
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
              let [nrows, rows] = await db.PersonDocs.update(
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
              let docDetail = await db.Persons.update(
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

            let docDetail = await db.DoctorDetails.update(
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
*/

module.exports = { getContactInfoFunc, getAddressTypeFunc, getDepartmentFunc, putBasicDetailsFunc, getRegistrationInfoFunc };
