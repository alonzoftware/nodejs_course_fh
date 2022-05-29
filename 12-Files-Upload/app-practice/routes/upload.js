const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateFile } = require("../middlewares");
const {
  uploadPost,
  uploadPutUpd,
  uploadPutUpdCloudinary,
  uploadGetImg,
} = require("../controllers/upload");
const { allowedCollections } = require("../helpers");

const router = Router();
router.post("/", [validateFile, validateFields], uploadPost);

router.put(
  "/:collection/:id",
  [
    validateFile,
    check("id", "The id must be a Mongo ID").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["user", "product"])
    ),
    validateFields,
  ],
  uploadPutUpdCloudinary //uploadPutUpd
);
router.get(
  "/:collection/:id",
  [
    check("id", "The id must be a Mongo ID").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["user", "product"])
    ),
    validateFields,
  ],
  uploadGetImg
);
module.exports = router;
