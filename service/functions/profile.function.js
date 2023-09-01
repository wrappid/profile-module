const { databaseActions, databaseProvider } = require("@wrappid/service-core");

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
    // var isValidJOI = await authenticateJOI(req, "departmentGET", ["query"]);
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

module.exports = { getContactInfoFunc, getAddressTypeFunc, getDepartmentFunc };
