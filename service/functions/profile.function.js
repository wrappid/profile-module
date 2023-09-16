const { databaseActions, databaseProvider, coreConstant } = require("@wrappid/service-core");
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
        userId: req.user.userId,
      },
    });
    let personId = person.id;
    let contactType = req.params.contactType;
    let personContacts = await databaseActions.findAll(
      "application",
      "PersonContacts",
      {
        where: {
          personId: personId,
          type: contactType,
          verified: true,
        },
      }
    );

    if (personContacts && personContacts.length > 0) {
      // send 200
      console.log("Contact info fetched successfully");
      return {
        status: 204,
        message: "Contact info fetched successfully",
        data: {
          rows: personContacts,
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
    throw err;
  }
};

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
    let result = await databaseProvider.application.sequelize.transaction(
      async (t) => {
        let docDetail = await databaseActions.update(
          "application",
          "Persons",
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
      }
    );

    console.log("Basic detail updated");

    return { status: 200, message: "Basic details updated" };
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
    let doctorDetails = await databaseActions.findOne(
      "application",
      "DoctorDetails",
      {
        include: [
          {
            as: "Persons",
            model: databaseProvider.application.models.Persons,
            where: { userId: userID },
          },
        ],
      }
    );

    let personDocs = doctorDetails
      ? await databaseActions.findOne("application", "PersonDocs", {
        where: {
          personId: doctorDetails?.dataValues?.Persons?.id,
          type: "Registration Document",
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

    if (doctorDetails) {
      return {
        status: 200,
        message: "Registration info fetched successfully",
        data: temp,
      };
    } else {
      return { status: 204, message: "Person registration info not found" };
    }
  } catch (err) {
    console.error(err);
    return {
      error: err,
      message: "Error while fetch person registration info data",
    };
  }
};

const putRegistrationDetailsFunc = async (req, res) => {
  try {
    let del_urls = [];
    let file_url = null;
    let personId = req.params.id;
    if (
      req.file["registrationDocument"] &&
      req.file["registrationDocument"][0]
    ) {
      file_url = await getUrl(
        req.file["registrationDocument"][0].filename
          ? req.file["registrationDocument"][0].filename
          : req.file["registrationDocument"][0].key
            ? req.file["registrationDocument"][0].key
            : req.file["registrationDocument"][0].originalname
      );
    }
    console.log("File URL", file_url);

    let d = await databaseActions.findOne("application", "DoctorDetails", {
      where: {
        doctorId: req.params.id,
      },
    });

    del_urls.push(file_url);

    let data = req.body;
    let result = await databaseProvider.application.sequelize.transaction(
      async (t) => {
        data.personDocs = [];

        if (!d) {
          console.log("Docotr details not found");
          let docDetail = await databaseActions.create(
            "application",
            "DoctorDetails",
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
          let [nrows, rows] = await databaseActions.update(
            "application",
            "PersonDocs",
            {
              docUrl: file_url,
              updatedBy: req.user.userId,
            },
            {
              where: {
                personId: personId,
              },
            },
            { transaction: t }
          );
          if (nrows == 0) {
            let nPersonDocs = await databaseActions.create(
              "application",
              "PersonDocs",
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

            console.log("Registration file entry made:", nPersonDocs.id);
          } else {
            console.log("Registration file URL updated");
          }
        } else {
          console.log("No registration file given");
        }

        if (data.departmentId) {
          let docDetail = await databaseActions.update(
            "application",
            "Persons",
            {
              departmentId: data.departmentId,
              updatedBy: req.user.userId,
            },
            {
              where: {
                id: personId,
              },
            },
            { transaction: t }
          );
          console.log("Department updated");
        }

        let docDetail = await databaseActions.update(
          "application",
          "DoctorDetails",
          {
            ...data,
            updatedBy: req.user.userId,
          },
          {
            where: {
              doctorId: personId,
            },
          },
          { transaction: t }
        );
      }
    );

    console.log("Registration detail updated");
    return { status: 200, message: "Registration details updated" };
  } catch (err) {
    console.log(err);
    return { status: 500, message: err };
    // res.status(500).json({ message: err });
  }
};

const postAddEducationFunc = async (req, res) => {
  try {
    let data = req.body;
    let personId = req.params.id;
    let result = await databaseProvider.application.sequelize.transaction(
      async (t) => {
        if (data.isCurrent) {
          data.endDate = null;
        }
        let addDetail = await databaseActions.create(
          "application",
          "PersonEducations",
          {
            ...data,
            personId: personId,
            createdBy: req.user.userId,
            updatedBy: req.user.userId,
            updatedBy: req.user.userId,
            _status: coreConstant.entityStatus.ACTIVE,
          },
          { transaction: t }
        );
        return addDetail.id;
      }
    );
    console.log("Education created", result);
    return { status: 200, message: "Education create success" };
    // res.status(200).json({ message: messageProcessor(200008) });
  } catch (err) {
    console.log(err);
    return {status: 500, message: err}
    // res.status(500).json({ message: messageProcessor(err) });
  }
};

const putUpdateEducationFunc = async (req, res) => {
  try {
    let data = req.body;
    if (data.isCurrent) {
      data.endDate = null;
    }
    let result = await databaseProvider.application.sequelize.transaction(async (t) => {
      let [nrows, rows] = await databaseActions.update("application","PersonEducations",
        {
          ...data,
          updatedBy: req.user.userId,
        },
        {
          where: { id: req.params.id },
        },{
          transaction: t,
        }
      );
      if (nrows == 0) {
        throw "Education update success";
      }
    });

    console.log("Education detail updated");
    return {status: 200, message: "Education update success"};
    // res.status(200).json({ message: "Education update success" });
  } catch (err) {
    console.log(err);
    return {status:500, message:err}
    // res.status(500).json({ message: messageProcessor(err) });
  }
};

const putDeleteEducationFunc = async (req, res) => {
  try {
    let educationId = req.params.id;
    let result = await databaseProvider.application.sequelize.transaction(async (t) => {
      let [nrows, rows] = await databaseActions.update("application","PersonEducations",
        {
          isActive: false,
          _status: coreConstant.entityStatus.DELETED,
          updatedBy: req.user.userId,
        },
        {
          where: { id: educationId },
        },{
          transaction: t,
        }
      );
      if (nrows == 0) {
        throw "Experience update success";
      }
    });
    console.log("education deleted: ", req.params.id);
    return { status:200, message: "Education delete success" };
    // res.status(200).json({ message: messageProcessor(200010) });
  } catch (error) {
    console.log("education Delete error", error);
    return{status:500, message: err};
    // res.status(500).json({ message: messageProcessor(error) });
  }
};

const postAddExperienceFunc = async (req, res) => {
  try {
    let data = req.body;
    let personId = req.params.id;
    let result = await databaseProvider.application.sequelize.transaction(async (t) => {
      if (data.isCurrent) {
        data.endDate = null;
      }
      let addDetail = await databaseActions.create("application","PersonExperiences",
        {
          ...data,
          personId: personId,
          createdBy: req.user.userId,
          updatedBy: req.user.userId,
          updatedBy: req.user.userId,
          _status: coreConstant.entityStatus.ACTIVE,
        },
        { transaction: t }
      );
      return addDetail.id;
    });
    console.log("Experience created", result);
    return {status:200, message: "Experience create success"};
    // res.status(200).json({ message: messageProcessor(200011) });
  } catch (err) {
    console.log(err);
    return {status: 500, message: err};
    // res.status(500).json({ message: messageProcessor(290013) });
  }
};

const putUpdateExperienceFunc = async (req, res) => {
  try {
    let data = req.body;
    if (data.isCurrent) {
      data.endDate = null;
    }
    let result = await databaseProvider.application.sequelize.transaction(async (t) => {
      let [nrows, rows] = await databaseActions.update("application","PersonExperiences",
        {
          ...data,
          updatedBy: req.user.userId,
        },
        {
          where: { id: req.params.id }
        },{
          transaction: t,
        }
      );
      if (nrows == 0) {
        throw "Experience update error";
      }
    });

    console.log("Experiences detail updated");
    return{status:200, message: "Experience update success"};
    // res.status(200).json({ message: messageProcessor(200012) });
  } catch (err) {
    console.log(err);
    return{status:500, message:err};
    // res.status(500).json({ message: messageProcessor(290014) });
  }
};

const putDeleteExperienceFunc = async (req, res) => {
  try {
    let result = await databaseProvider.application.sequelize.transaction(async (t) => {
      let experienceId = req.params.id;
      let [nrows, rows] = await databaseActions.update("application","PersonExperiences",
        {
          isActive: false,
          updatedBy: req.user.userId,
          _status: coreConstant.entityStatus.DELETED,
        },
        {
          where: { id: experienceId }
        },{ 
          transaction: t,
        }
      );
      if (nrows == 0) {
        throw "Experience delete error";
      }
    });
    console.log("Experiences deleted: ", req.params.id);
    return {status: 200, message: "Experience delete success"};
    // res.status(200).json({ message: messageProcessor(200013) });
  } catch (error) {
    console.log("education Delete error", error);
    return{status:500, message: error};
    // res.status(500).json({ message: messageProcessor(290015) });
  }
};


module.exports = {
  getContactInfoFunc,
  getAddressTypeFunc,
  getDepartmentFunc,
  putBasicDetailsFunc,
  getRegistrationInfoFunc,
  putRegistrationDetailsFunc,
  postAddEducationFunc,
  putUpdateEducationFunc,
  putDeleteEducationFunc,
  postAddExperienceFunc,
  putUpdateExperienceFunc,
  putDeleteExperienceFunc
};
