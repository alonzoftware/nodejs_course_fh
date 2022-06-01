const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPost,
  userPut,
  userDelete,
  userPatch,
} = require("../controllers/user");

// const { validateFields } = require("../middlewares/validate-fields");
// const validateJWT = require("../middlewares/validate-jwt");
// const { isAdminRole, hasTheseRoles } = require("../middlewares/validate-role");

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
  userGet
);
router.post(
  "/",
  [
    check("name", "Name not found").not().isEmpty(),
    check("email", "This is not an Email").isEmail(),
    check("pass", "The Password must have at least 6 characters").isLength({
      min: 6,
    }),
    // check("role", "This Role is Not Defined").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    // check("role").custom((role) => {
    //   return validateRole(role);
    // }),
    check("email").custom(existEmail),
    check("role").custom(validateRole),
    validateFields,
  ],
  userPost
);

router.put(
  "/:id",
  [
    check("id", "This is not a Valid Mongo ID").isMongoId(),
    check("id").custom(existUserID),
    check("role", "Role not found").not().isEmpty(),
    check("role").custom(validateRole),
    validateFields,
  ],
  userPut
);
router.delete(
  "/:id",
  [
    validateJWT,
    // isAdminRole,
    hasTheseRoles("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "This is not a Valid Mongo ID").isMongoId(),
    check("id").custom(existUserID),
    validateFields,
  ],
  userDelete
);
router.patch("/", userPatch);

module.exports = router;
