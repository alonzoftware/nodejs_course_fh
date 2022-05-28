const { Router } = require("express");
const { check } = require("express-validator");
const { searchGet } = require("../controllers/search");
const { validateFields } = require("../middlewares");

const router = Router();
router.get(
  "/:collection/:term",
  [
    check("collection", "Collection not found").not().isEmpty(),
    check("term", "Term not found").not().isEmpty(),

    validateFields,
  ],
  searchGet
);

module.exports = router;
