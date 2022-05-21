const Role = require("../models/role");
const User = require("../models/user");

const validateRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`The Role ${role} not exist in DB`);
  }
};

const validateEmail = async (email = "") => {
  const emailExist = await User.findOne({ email }); //{email : email}
  if (emailExist) {
    throw new Error(`The Email ${email} is duplicated in DB`);
  }
};

module.exports = {
  validateRole,
  validateEmail,
};
