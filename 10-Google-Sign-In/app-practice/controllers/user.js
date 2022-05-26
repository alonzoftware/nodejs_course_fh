const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const userGet = async (req = request, res = response) => {
  let { page = 1, limit = 5 } = req.query;
  page = Number(page - 1) * Number(limit);
  const cond = { status: true }; //Condition
  // const users = await user.find({status : true});
  // const total = await user.countDocuments(cond);
  // const users = await user.find(cond).skip(Number(page)).limit(Number(limit));

  const [total, users] = await Promise.all([
    User.countDocuments(cond),
    User.find(cond).skip(Number(page)).limit(Number(limit)).sort({ name: 1 }),
  ]);

  res.status(200).json({
    msg: "This is a GET RESPONSE",
    total,
    users,
  });
};
const userPost = async (req = request, res = response) => {
  //   const body = req.body;
  //   const user = new User(body);
  // Transfer to validate-fields
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json(errors);
  // }

  const { name, email, pass, role } = req.body;
  const user = new User({ name, email, pass, role });

  const emailExist = await User.findOne({ email }); //{email : email}
  if (emailExist) {
    return res.status(400).json({
      msg: "The Email is duplicated",
    });
  }

  const salt = bcryptjs.genSaltSync(); //10 by default
  user.pass = bcryptjs.hashSync(pass, salt);

  await user.save();
  res.status(201).json({
    msg: "This is a POST request",
    user,
  });
};
const userPut = async (req = request, res = response) => {
  // const id = req.params.id;
  const { id } = req.params;
  const { pass, email, google, ...restParams } = req.body;
  if (pass) {
    const salt = bcryptjs.genSaltSync(); //10 by default
    restParams.pass = bcryptjs.hashSync(pass, salt);
  }
  // const user = await User.findByIdAndUpdate(id, restParams); // Old User
  const userUpd = await User.findByIdAndUpdate(id, restParams, { new: true }); // New User

  res.status(202).json({
    msg: "This is a PUT request",
    userUpd,
  });
};
const userDelete = async (req = request, res = response) => {
  const id = req.params.id;
  const userAuth = req.userAuth;
  // const userDel = await User.findByIdAndDelete(id);//Not Recomended - Inconsistent References
  const userDel = await User.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json({
    msg: "This is a DELETE request",
    userDel,
    userAuth,
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
