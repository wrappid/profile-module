

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