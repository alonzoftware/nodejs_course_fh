const { request, response } = require("express");
const { Product } = require("../models");

const productGetAll = async (req = request, res = response) => {
  let { page = 1, rows = 5 } = req.query;
  page = Number(page - 1) * Number(rows);
  const cond = { status: true }; //Condition

  const [total, products] = await Promise.all([
    Product.countDocuments(cond),
    Product.find(cond)
      .populate("user", ["name", "email"]) //Join with User field
      .populate("category", ["name"])
      .skip(Number(page))
      .limit(Number(rows)),
  ]);

  res.status(200).json({
    msg: "This is a GET RESPONSE",
    total,
    products,
  });
};
const productGetID = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", ["name", "email"]) //Join with User field
    .populate("category", ["name"]);
  res.status(200).json({
    msg: "This is a GET RESPONSE BY ID",
    product,
  });
};
const productPostAdd = async (req = request, res = response) => {
  const { status, user, ...body } = req.body;

  // Generar la data a guardar
  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.userAuth._id,
  };

  const product = new Product(data);

  // Guardar DB
  await product.save();
  res.status(200).json({
    msg: "This is a POST RESPONSE",
    product,
  });
};
const productPutUpd = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.userAuth._id;

  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
  })
    .populate("user", ["name"])
    .populate("category", ["name"]);

  res.status(200).json({
    msg: "This is a PUT UPD RESPONSE",
    product,
  });
};
const productDel = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  ).populate("user", ["name"]);

  res.status(200).json({
    msg: "This is a DEL RESPONSE",
    product,
  });
};

module.exports = {
  productGetAll,
  productGetID,
  productPostAdd,
  productPutUpd,
  productDel,
};
