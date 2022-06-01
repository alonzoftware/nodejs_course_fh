const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const { __v, ...category } = this.toObject();
  return category;
};

module.exports = model("Category", CategorySchema);
