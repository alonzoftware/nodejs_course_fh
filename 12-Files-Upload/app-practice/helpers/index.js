const uploadFile = require("./upload-file");
const generateJWT = require("./generate-jwt");
const googleVerify = require("./google-verify");
const validateDB = require("./validate-db");

module.exports = {
  ...uploadFile,
  ...generateJWT,
  ...googleVerify,
  ...validateDB,
};
