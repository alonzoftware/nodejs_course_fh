const { model, Schema } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "The Name is required"],
  },
  email: {
    type: String,
    required: [true, "The Email is required"],
    unique: true,
  },
  pass: {
    type: String,
    required: [true, "The Password is required"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("User", UserSchema);
