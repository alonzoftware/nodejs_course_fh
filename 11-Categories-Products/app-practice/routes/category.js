const { Router } = require("express");
const { check } = require("express-validator");
const {
  categoryGetAll,
  categoryGetID,
  categoryPostAdd,
  categoryPutUpd,
  categoryDel,
} = require("../controllers/category");

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
  isDuplicateCategoryName,
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
  categoryGetAll
);
router.get(
  "/:id",
  [
    // check("id", "This is not a Valid Mongo ID").isMongoId(),
    check("id").custom(existCategoryID),
    validateFields,
  ],
  categoryGetID
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "The Name is required").not().isEmpty(),
    validateFields,
  ],
  categoryPostAdd
);

router.put(
  "/:id",
  [
    validateJWT,
    // check("id", "This is not a Valid Mongo ID").isMongoId(),
    check("id").custom(existCategoryID),
    check("name", "The Name is required").not().isEmpty(),
    check("name").custom((name) => {
      return isDuplicateCategoryName(name);
    }),
    validateFields,
  ],
  categoryPutUpd
);
router.delete(
  "/:id",
  [
    validateJWT,
    hasTheseRoles("ADMIN_ROLE"),
    // check("id", "This is not a Valid Mongo ID").isMongoId(),
    check("id").custom(existCategoryID),
    validateFields,
  ],
  categoryDel
);

module.exports = router;
