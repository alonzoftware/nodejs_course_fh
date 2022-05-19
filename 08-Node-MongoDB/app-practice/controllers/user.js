const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const userGet = (req = request, res = response) => {
  const { nameUser, ageUser } = req.body;
  res.json({
    msg: "This is a GET request",
    nameUser,
    ageUser,
  });
};
const userPost = async (req = request, res = response) => {
  //   const body = req.body;
  //   const user = new User(body);
  const { name, email, pass, rol } = req.body;
  const user = new User({ name, email, pass, rol });
  const salt = bcryptjs.genSaltSync(); //10 by default
  user.pass = bcryptjs.hashSync(pass, salt);

  await user.save();
  res.status(201).json({
    msg: "This is a POST request",
    user,
  });
};
const userPut = (req = request, res = response) => {
  const id = req.params.id;
  res.status(202).json({
    msg: "This is a PUT request",
    id: id,
  });
};
const userDelete = (req = request, res = response) => {
  res.json({
    msg: "This is a DELETE request",
  });
};
const userPatch = (req = request, res = response) => {
  res.json({
    msg: "This is a PATCH request",
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
  userPatch,
};
