const Role = require("../models/role");
const User = require("../models/user");

const validateRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`The Role ${role} not exist in DB`);
  }
};

const existEmail = async (email = "") => {
  const emailExist = await User.findOne({ email }); //{email : email}
  if (emailExist) {
    throw new Error(`The Email ${email} is duplicated in DB`);
  }
};
const existUserID = async (id = "") => {
  const userIdExist = await User.findById(id); //{email : email}
  if (!userIdExist) {
    throw new Error(`The User ID ${id} not Exist`);
  }
};

module.exports = {
  validateRole,
  existEmail,
  existUserID,
};
