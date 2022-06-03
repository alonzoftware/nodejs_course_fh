const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers");
const { googleVerify } = require("../helpers/google-verify");

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
const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);

    let user = await User.findOne({ email: googleUser.email });
    if (!user) {
      data = {
        email: googleUser.email,
        name: googleUser.name,
        img: googleUser.img,
        pass: ":p",
        status: true,
        google: true,
        role: "USER_ROLE",
      };
      user = new User(data);

      await user.save();
    }

    if (!user.status) {
      return res.status(400).json({
        msg: `User with email : ${user.email} is Disable, speak with Administrator`,
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.status(200).json({
      msg: "Google Auth OK!",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: `Token Invalid with Error : ${error}`,
    });
  }
};

const renewToken = async (req = request, res = response) => {
  const { userAuth } = req;
  const token = await generateJWT(userAuth.id);
  res.status(200).json({
    userAuth,
    token,
  });
};
module.exports = {
  authPostLogin,
  googleSignIn,
  renewToken,
};
