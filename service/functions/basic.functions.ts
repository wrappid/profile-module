/* eslint-disable no-console */
// import { /* deleteS3FIle, messageProcessor, getUrl, upload */ } from "@wrappid/service-core";
// import { DEFAULT_DB } from "../constants/profile.constants";



/**
 * 
 * @param {*} req 
 * @returns 
 */
export const updateBasicDetails = async (req, res, /*databaseActions */) => {
  try {
    console.log(req);
    
    /* const del_urls = [];
    let file_url = null;
    const personId = req.params.id; */

    /* await upload.fields([{ maxCount: 1, name: "photo" }])(
      req,
      res,
      async function (err) {
        try {
          if (err) {
            console.log("FIle Upload error", err);
            throw err;
          } else {
            const data = req.body;

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
            
            await databaseActions.update(DEFAULT_DB, "Persons",
              {
                ...data,
                updatedBy: req.user.userId,
              },
              { where: { id: personId } }
            );

            console.log("Basic detail updated");
            res.status(200).json({ message: messageProcessor(200004) });
          }
        } catch (err) {
          console.log(err);
          await deleteS3FIle(del_urls);
          res.status(500).json({ message: messageProcessor(err) });
        }
      }
    ); */
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "unknown"/* messageProcessor(err) */ });
  }
};
