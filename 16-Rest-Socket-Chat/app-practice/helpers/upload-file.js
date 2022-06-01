const { v4: uuidv4 } = require("uuid");
const path = require("path");

const allowedExtensionsDefault = ["jpg", "jpeg", "png", "gif"];
const uploadFile = async (
  files,
  allowedExtensions = allowedExtensionsDefault,
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const fileUploaded = files.fileUploaded;
    const nameFile = fileUploaded.name;
    const nameFileSplit = nameFile.split(".");
    const ext = nameFileSplit[nameFileSplit.length - 1];

    if (!allowedExtensions.includes(ext)) {
      return reject(`Only allowed these extensions ${allowedExtensions}`);
    }
    const nameFileTemp = uuidv4() + "." + ext;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      folder,
      nameFileTemp
    );

    fileUploaded.mv(uploadPath, function (err) {
      if (err) {
        reject(err);
      }
      resolve(nameFileTemp);
    });
  });
};

module.exports = { uploadFile };
