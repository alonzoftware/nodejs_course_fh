const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPost,
  userPut,
  userDelete,
  userPatch,
} = require("../controllers/user");
const { validateFields } = require("../middlewares/validate-fields");
const { validateRole, validateEmail } = require("../helpers/validate-db");

const router = Router();

router.get("/", userGet);
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
    check("email").custom(validateEmail),
    check("role").custom(validateRole),
    validateFields,
  ],
  userPost
);

router.put("/:id", userPut);
router.delete("/", userDelete);
router.patch("/", userPatch);

module.exports = router;
