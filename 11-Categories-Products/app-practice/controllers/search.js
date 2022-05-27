const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Product } = require("../models");

const allowCollections = ["user", "category", "product", "role"];

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
    msg: "This is a SEARCH GET RESPONSE",
    result: products,
  });
};

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
      break;
    case "user":
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

module.exports = {
  searchGet,
};
