const { request, response } = require("express");

const categoryGetAll = async (req = request, res = response) => {
  //   let { page = 1, limit = 5 } = req.query;
  //   page = Number(page - 1) * Number(limit);
  //   const cond = { status: true }; //Condition

  //   const [total, users] = await Promise.all([
  //     User.countDocuments(cond),
  //     User.find(cond).skip(Number(page)).limit(Number(limit)),
  //   ]);

  res.status(200).json({
    msg: "This is a GET RESPONSE",
  });
};
const categoryGetID = async (req = request, res = response) => {
  const id = req.params.id;
  res.status(200).json({
    msg: "This is a GET RESPONSE BY ID",
    id,
  });
};
const categoryPostAdd = async (req = request, res = response) => {
  res.status(200).json({
    msg: "This is a POST RESPONSE",
  });
};
const categoryPutUpd = async (req = request, res = response) => {
  res.status(200).json({
    msg: "This is a PUT RESPONSE",
  });
};
const categoryDel = async (req = request, res = response) => {
  res.status(200).json({
    msg: "This is a DEL RESPONSE",
  });
};

module.exports = {
  categoryGetAll,
  categoryGetID,
  categoryPostAdd,
  categoryPutUpd,
  categoryDel,
};
