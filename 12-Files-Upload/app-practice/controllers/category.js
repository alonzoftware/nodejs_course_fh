const { request, response } = require("express");
const { Category } = require("../models");

const categoryGetAll = async (req = request, res = response) => {
  let { page = 1, rows = 5 } = req.query;
  page = Number(page - 1) * Number(rows);
  const cond = { status: true }; //Condition

  const [total, categories] = await Promise.all([
    Category.countDocuments(cond),
    Category.find(cond)
      .populate("user", ["name", "email"]) //Join with User field
      .skip(Number(page))
      .limit(Number(rows)),
  ]);

  res.status(200).json({
    msg: "This is a GET RESPONSE",
    total,
    categories,
  });
};
const categoryGetID = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", [
    "name",
    "email",
  ]); //Join with User field
  res.status(200).json({
    msg: "This is a GET RESPONSE BY ID",
    category,
  });
};
const categoryPostAdd = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const data = {
    name,
    user: req.userAuth._id,
  };
  const category = new Category(data);
  await category.save();
  res.status(200).json({
    msg: "This is a POST RESPONSE",
    category,
  });
};
const categoryPutUpd = async (req = request, res = response) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();

  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  ).populate("user", ["name"]);

  res.status(200).json({
    msg: "This is a PUT UPD RESPONSE",
    category,
  });
};
const categoryDel = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  ).populate("user", ["name"]);

  res.status(200).json({
    msg: "This is a DEL RESPONSE",
    category,
  });
};

module.exports = {
  categoryGetAll,
  categoryGetID,
  categoryPostAdd,
  categoryPutUpd,
  categoryDel,
};
