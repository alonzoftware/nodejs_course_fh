const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "The Name is required"],
    unique: true,
  },
  status: {
    type: Boolean,
    required: [true, "The Status is required"],
    default: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  descrip: {
    type: String,
    default: "",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Product", ProductSchema);
