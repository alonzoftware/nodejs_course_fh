const { Router } = require("express");
const { check } = require("express-validator");
const {
  productGetAll,
  productGetID,
  productPostAdd,
  productPutUpd,
  productDel,
} = require("../controllers/product");

const {
  validateFields,
  validateJWT,
  isAdminRole,
  hasTheseRoles,
} = require("../middlewares");

const {
  validateRole,
  existEmail,
  existUserID,
  existCategoryID,
  existProductID,
  isDuplicateProductName,
} = require("../helpers/validate-db");

const router = Router();

router.get(
  "/",
  [
    check("page", "The page number must be greater than or equal to one").isInt(
      { min: 1, max: 50 }
    ),
    validateFields,
  ],
  productGetAll
);
router.get(
  "/:id",
  [
    // check("id", "This is not a Valid Mongo ID").isMongoId(),
    check("id").custom(existProductID),
    validateFields,
  ],
  productGetID
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "The Name is required").not().isEmpty(),
    check("category", "The Category is required").not().isEmpty(),
    check("category").custom(existCategoryID),

    validateFields,
  ],
  productPostAdd
);

router.put(
  "/:id",
  [
    validateJWT,
    // check("id", "This is not a Valid Mongo ID").isMongoId(),
    check("id").custom(existProductID),
    check("name", "The Name is required").not().isEmpty(),
    check("name").custom((name) => {
      return isDuplicateProductName(name);
    }),
    validateFields,
  ],
  productPutUpd
);
router.delete(
  "/:id",
  [
    validateJWT,
    hasTheseRoles("ADMIN_ROLE"),
    // check("id", "This is not a Valid Mongo ID").isMongoId(),
    check("id").custom(existProductID),
    validateFields,
  ],
  productDel
);

module.exports = router;
