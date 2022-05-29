const { Role, User, Product, Category } = require("../models");
const mongoose = require("mongoose");

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
const existCategoryID = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`This is not a Valid Mongo ID`);
  }

  const categoryIdExist = await Category.findById(id); //{email : email}
  if (!categoryIdExist) {
    throw new Error(`The Category ID ${id} not Exist`);
  }
};
const existProductID = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`This is not a Valid Mongo ID`);
  }

  const productIdExist = await Product.findById(id); //{email : email}
  if (!productIdExist) {
    throw new Error(`The Product ID ${id} not Exist`);
  }
};
const isDuplicateCategoryName = async (name = "") => {
  const nameDB = name.toUpperCase();
  const categoryNameDB = await Category.findOne({ name: nameDB }); //{email : email}
  if (categoryNameDB) {
    throw new Error(`The Category ${nameDB} is duplicated in DB`);
  }
};
const isDuplicateProductName = async (name = "") => {
  const nameDB = name.toUpperCase();
  const productNameDB = await Product.findOne({ name: nameDB }); //{email : email}
  if (productNameDB) {
    throw new Error(`The Product ${nameDB} is duplicated in DB`);
  }
};
const allowedCollections = (collection, collections = []) => {
  if (!collections.includes(collection)) {
    throw new Error(`Only these collections are allowed : ${collections}`);
  }
  return true;
};

module.exports = {
  validateRole,
  existEmail,
  existUserID,
  existCategoryID,
  existProductID,
  isDuplicateCategoryName,
  isDuplicateProductName,
  allowedCollections,
};
