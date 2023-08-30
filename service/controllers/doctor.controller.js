/* eslint-disable no-console */
const { databaseActions } = require("@wrappid/service-core");

const { updateDoctorDetails } = require("../functions/doctor.functions");

module.exports.updateDoctorsDetails = async (req, res) => {
  try{
    await updateDoctorDetails(req, res, databaseActions);
  } 
  catch(err){
    console.error("Doctor details updated", err);
    res.status(500).json({ message: "Doctor details update error" });
  } 
};
  
module.exports.postDoctorsDetails = async (req, res) => {
  
};
  
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
  