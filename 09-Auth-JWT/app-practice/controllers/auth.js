const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const generateJWT = require("../helpers/generate-jwt");

const authPostLogin = async (req = request, res = response) => {
  const { email, pass } = req.body;
  try {
    // Check User Exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User / Password ERROR - Not Exist User",
      });
    }
    //Check if User is Active
    if (!user.status) {
      return res.status(400).json({
        error: "User / Password ERROR - User status is false",
      });
    }

    //Check Password is correct
    const validPass = bcryptjs.compareSync(pass, user.pass);
    if (!validPass) {
      return res.status(400).json({
        error: "User / Password ERROR - Incorrect Password",
      });
    }

    const token = await generateJWT(user.id);

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: `Problem with SERVER - ERROR : ${error}`,
    });
  }
};

module.exports = {
  authPostLogin,
};
