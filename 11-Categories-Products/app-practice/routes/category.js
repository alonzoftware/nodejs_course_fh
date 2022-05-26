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
router.get("/:id", [validateFields], categoryGetID);
router.post("/", [validateJWT, validateFields], categoryPostAdd);

router.put("/:id", [validateFields], categoryPutUpd);
router.delete("/:id", [validateFields], categoryDel);

module.exports = router;
