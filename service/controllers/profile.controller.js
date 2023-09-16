/* eslint-disable no-unused-vars */
/* eslint-disable id-length */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const profileFunction = require("../functions/profile.function")

module.exports.getContactInfo = async (req, res) => {
  try{
    let {status, ...restData} = await profileFunction.getContactInfoFunc(req, res);
    res.status(status).json(restData);
  }catch(error){
    console.error("Error:: ", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAddressType = async (req, res) => {
  try{
    let {status, ...restData} = await profileFunction.getAddressTypeFunc(req, res);
    res.status(status).json(restData);
  }catch(error){
    console.error("Error:: ", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

module.exports.getDepartment = async (req, res) => {
  try{
    let {status, ...restData} = await profileFunction.getDepartmentFunc(req, res);
    res.status(status).json(restData);
  }catch(error){
    console.error("Error:: ", error);
    res.status(500).json({ message: error.message });
  }
};



module.exports.getPersonContacts = async (req, res) => {
  try{
    let {status, ...restData} = await profileFunction.getPersonContactsFunc(req, res);
    res.status(status).json(restData);
  }catch(error){
    console.error("Error:: ", error);
    res.status(500).json({ message: error.message });
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */



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


module.exports.getRegistrationInfo = async (req, res) => {
  try {
     let result = await profileFunction.getRegistrationInfoFunc(req, res);
    let { status, message, data } = result;
     res.status(status).json({message: message, data 
   });
  } catch (error) {
    console.error("Registration info fetched Error:: ", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports.putBasicDetails = async (req, res) => {
  try {
    let result = await profileFunction.putBasicDetailsFunc(req, res);
    let { status, message, data } = result;
    res.status(status).json({message: message, data 
  });
  
  } catch (error) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.putRegistrationDetails = async (req, res) => {
  try {
    res.status(200).json({message:"API call successfully!!"})
   /*let result = await profileFunction.putRegistrationDetailsFunc(req, res);
    let { status, message, data } = result;
    res.status(status).json({message: message, data 
  }); */
  } catch (error) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
}