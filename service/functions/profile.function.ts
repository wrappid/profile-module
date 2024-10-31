/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line no-unused-vars */
import {
  databaseActions,
  databaseProvider,
  coreConstant,
} from "@wrappid/service-core";

const getContactInfoFunc = async (req: any, res: any) => {
  try {
    const userID = req.user.userId;

    console.log("User ID = " + userID);

    const userDetails = await databaseActions.findOne("application", "Users", {
      include: [
        {
          as: "Person",
          model: databaseProvider.application.models.Persons,
        },
      ],
      where: { id: userID },
    });
    const data = {
      email: userDetails.email,
      emailVerified: userDetails?.Person?.emailVerified,
      phone: userDetails?.phone,
      phoneVerified: userDetails?.Person?.phoneVerified,
      profileId: userDetails?.Person?.profileId,
      website: userDetails?.Person?.website,
    };

    console.log("Contact info fetched successfully");
    return { data, message: "Contact info fetched successfully", status: 200 };
  } catch (err:any) {
    console.error(err);
    throw err;
  }
};

const getAddressTypeFunc = async (req: any, res: any) => {
  try {
    const data = await databaseActions.findAll("application", "AddressTypes", {
      attributes: ["id", "type"],
    });

    if (data.length > 1) {
      console.log("Address types fetched successfully");
      return {
        data,
        message: "Address types fetched successfully",
        status: 200,
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPersonContactsFunc = async (req: any, res: any) => {
  try {
    const person = await databaseActions.findOne("application", "Persons", {
      where: { userId: req.user.userId },
    });
    const personId = person.id;
    const contactType = req.params.contactType;
    const personContacts = await databaseActions.findAll(
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
        data: { rows: personContacts },
        message: "Contact info fetched successfully",
        status: 200,
      };
    } else {
      // send 204
      return {
        message: `No ${contactType}(s) found.`,
        status: 204,
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const putBasicDetailsFunc = async (req: any, res: any) => {
  try {
    let file_url = null;
    const personId = req.params.id;

    const data = req.body;

    if (data.extraInfo) data.extraInfo = JSON.parse(data.extraInfo);
    if (data.bio) data["extraInfo"] = { bio: data.bio };
    if (req?.files && req.files["photo"] && req.files["photo"][0]) {
      file_url = req.files.photo[0].location;
      data.photoUrl = file_url;
    }
    console.log(data.photoUrl);
    console.log("UPDATEING DATA", data);
    await databaseProvider.application.sequelize.transaction(
      async (transaction: any) => {
        await databaseActions.update(
          "application",
          "Persons",
          {
            ...data,
            updatedBy: req.user.userId,
          },
          {
            transaction: transaction,
            where: { id: personId },
          }
        );
      }
    );

    console.log("Basic detail updated");

    return { message: "Basic details updated", status: 200 };
  } catch (err) {
    console.log(err);
    throw err;
  }
};


const postAddEducationFunc = async (req: any, res: any) => {
  try {
    const data: any = req.body;
    const personId = req.params.id;
    const result = await databaseProvider.application.sequelize.transaction(
      async (transaction: any) => {
        if (data.isCurrent) {
          data.endDate = null;
        }
        const addDetail = await databaseActions.create(
          "application",
          "PersonEducations",
          {
            ...data,
            _status: coreConstant.entityStatus.ACTIVE,
            createdBy: req.user.userId,
            personId: personId,
            updatedBy: req.user.userId,
          },
          { transaction: transaction }
        );

        return addDetail.id;
      }
    );

    console.log("Education created", result);
    return { message: "Education create success", status: 200 };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const putUpdateEducationFunc = async (req: any, res: any) => {
  try {
    const data = req.body;

    if (data.isCurrent) {
      data.endDate = null;
    }
    await databaseProvider.application.sequelize.transaction(
      async (transaction: any) => {
        const [nrows] = await databaseActions.update(
          "application",
          "PersonEducations",
          {
            ...data,
            updatedBy: req.user.userId,
          },
          { where: { id: req.params.id } },
          { transaction: transaction }
        );

        if (nrows == 0) {
          throw "Education update success";
        }
      }
    );

    console.log("Education detail updated");
    return { message: "Education update success", status: 200 };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const putDeleteEducationFunc = async (req: any, res: any) => {
  try {
    const educationId = req.params.id;
    await databaseProvider.application.sequelize.transaction(
      async (transaction: any) => {
        const [nrows] = await databaseActions.update(
          "application",
          "PersonEducations",
          {
            _status: coreConstant.entityStatus.DELETED,
            isActive: false,
            updatedBy: req.user.userId,
          },
          { where: { id: educationId } },
          { transaction: transaction }
        );

        if (nrows == 0) {
          throw "Education Delete error: No Row Update";
        }
      }
    );

    console.log("Education deleted: ", req.params.id);
    return { message: "Education delete success", status: 200 };
  } catch (error) {
    console.log("Education Delete error: ", error);
    throw error;
  }
};

const postAddExperienceFunc = async (req: any, res: any) => {
  try {
    const data: any = req.body;
    const personId = req.params.id;
    const result = await databaseProvider.application.sequelize.transaction(
      async (transaction: any) => {
        if (data.isCurrent) {
          data.endDate = null;
        }
        const addDetail = await databaseActions.create(
          "application",
          "PersonExperiences",
          {
            ...data,
            _status: coreConstant.entityStatus.ACTIVE,
            createdBy: req.user.userId,
            personId: personId,
            updatedBy: req.user.userId,
          },
          { transaction: transaction }
        );

        return addDetail.id;
      }
    );

    console.log("Experience created", result);
    return { message: "Experience create success", status: 200 };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const putUpdateExperienceFunc = async (req: any, res: any) => {
  try {
    const data = req.body;

    if (data.isCurrent) {
      data.endDate = null;
    }
    await databaseProvider.application.sequelize.transaction(
      async (transaction: any) => {
        const [nrows] = await databaseActions.update(
          "application",
          "PersonExperiences",
          {
            ...data,
            updatedBy: req.user.userId,
          },
          { where: { id: req.params.id } },
          { transaction: transaction }
        );

        if (nrows == 0) {
          throw "Experience update error";
        }
      }
    );

    console.log("Experiences detail updated");
    return { message: "Experience update success", status: 200 };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const putDeleteExperienceFunc = async (req: any, res: any) => {
  try {
    await databaseProvider.application.sequelize.transaction(
      async (transaction: any) => {
        const experienceId = req.params.id;
        const [nrows] = await databaseActions.update(
          "application",
          "PersonExperiences",
          {
            _status: coreConstant.entityStatus.DELETED,
            isActive: false,
            updatedBy: req.user.userId,
          },
          { where: { id: experienceId } },
          { transaction: transaction }
        );

        if (nrows == 0) {
          throw "Experience delete error: No Row Update";
        }
      }
    );

    console.log("Experiences deleted: ", req.params.id);
    return { message: "Experience delete success", status: 200 };
  } catch (error) {
    console.log("Experience Delete error", error);
    throw error;
  }
};

export {
  getAddressTypeFunc,
  getContactInfoFunc,
  postAddEducationFunc,
  postAddExperienceFunc,
  putBasicDetailsFunc,
  putDeleteEducationFunc,
  putDeleteExperienceFunc,
  putUpdateEducationFunc,
  putUpdateExperienceFunc,
  getPersonContactsFunc,
};
