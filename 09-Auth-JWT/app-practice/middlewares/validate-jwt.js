const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  try {
    const token = req.header("x-token");
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        msg: "Error Invalid TOKEN - This User not exist",
      });
    }
    if (!user.status) {
      return res.status(401).json({
        msg: "Error Invalid TOKEN - This User Status is False",
      });
    }

    req.userAuth = user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Error Invalid TOKEN",
    });
  }
};

module.exports = validateJWT;
