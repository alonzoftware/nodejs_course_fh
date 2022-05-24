const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const { authPostLogin } = require("../controllers/auth");
const router = Router();

router.post(
  "/login",
  [
    check("email", "This is not an Email").isEmail(),
    check("pass", "The Password is required").not().isEmpty(),
    validateFields,
  ],
  authPostLogin
);

module.exports = router;
