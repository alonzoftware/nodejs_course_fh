const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const { authPostLogin, googleSignIn } = require("../controllers/auth");
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
router.post(
  "/google",
  [
    check("id_token", "The Google ID Token is required").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

module.exports = router;
