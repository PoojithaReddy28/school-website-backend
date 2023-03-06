const uploadFile = require("../middleware/upload");
const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Upload a file please!" });
    }
    res.status(200).send({
      message:
        "The following file was uploaded successfully: " +
        req.file.originalname,
    });
  } catch (err) {
    // error handling
    res.status(500).send({
      message: `Unable to upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

module.exports = upload;
