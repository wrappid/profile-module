
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