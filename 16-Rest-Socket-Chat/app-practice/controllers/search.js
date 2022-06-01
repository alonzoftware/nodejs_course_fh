const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Product, User, Category } = require("../models");

const allowCollections = ["user", "category", "product", "role"];

const searchGet = async (req = request, res = response) => {
  let { page = 1, limit = 5 } = req.query;
  const { collection, term } = req.params;
  page = Number(page - 1) * Number(limit);
  const cond = { status: true }; //Condition

  if (!allowCollections.includes(collection)) {
    return res.status(400).json({
      msg: `Only these collections are allowed : ${allowCollections}`,
    });
  }

  switch (collection) {
    case "product":
      collectionProduct(term, res);
      break;
    case "category":
      collectionCategory(term, res);
      break;
    case "user":
      collectionUser(term, res);
      break;

    default:
      return res.status(500).json({
        msg: "This is Search Error in SERVER",
        collection,
        term,
      });
      break;
  }
  //   res.status(200).json({
  //     msg: "This is a SEARCH GET RESPONSE",
  //     collection,
  //     term,
  //   });
};

const collectionProduct = async (term, res = response) => {
  const isMongoID = ObjectId.isValid(term); // TRUE

  if (isMongoID) {
    const product = await Product.findById(term);
    return res.status(200).json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const products = await Product.find({
    $or: [{ name: regex }, { descrip: regex }],
    $and: [{ status: true }],
  });

  res.status(200).json({
    msg: "This is a SEARCH PRODUCT GET RESPONSE",
    result: products,
  });
};
const collectionUser = async (term, res = response) => {
  const isMongoID = ObjectId.isValid(term); // TRUE

  if (isMongoID) {
    const user = await User.findById(term);
    return res.status(200).json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  res.status(200).json({
    msg: "This is a SEARCH USER GET RESPONSE",
    result: users,
  });
};
const collectionCategory = async (term, res = response) => {
  const isMongoID = ObjectId.isValid(term); // TRUE

  if (isMongoID) {
    const category = await Category.findById(term);
    return res.status(200).json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, "i");
  // const total = await Category.countDocuments({ name: regex, status: true });
  // const categories = await Category.find({ name: regex, status: true });
  const cond = { name: regex, status: true };
  const [total, categories] = await Promise.all([
    Category.countDocuments(cond),
    Category.find(cond),
  ]);

  res.status(200).json({
    msg: "This is a SEARCH USER GET RESPONSE",
    total,
    result: categories,
  });
};

module.exports = {
  searchGet,
};
