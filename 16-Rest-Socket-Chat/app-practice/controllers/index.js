const auth = require("./auth");
const user = require("./user");
const category = require("./category");
const product = require("./product");

module.exports = {
  ...auth,
  ...user,
  ...category,
  ...product,
};
