
const testFunctions = require("../functions/test.functions");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.getRegistrationInfo = async (req, res) =>{
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
