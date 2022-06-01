const fs = require("fs");
const path = require("path");
const { request, response } = require("express");
const cloudinary = require("cloudinary").v2;

const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const uploadPost = async (req = request, res = response) => {
  try {
    // const nameFileUploaded = await uploadFile(req.files);
    const nameFileUploaded = await uploadFile(req.files, undefined, "img");
    // const nameFileUploaded = await uploadFile(req.files, ["txt", "md"], "text");
    res.status(200).json({
      msg: "Name File uploaded:" + nameFileUploaded,
    });
  } catch (error) {
    res.status(500).json({
      Error: error,
    });
  }
};

const uploadPutUpd = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;
  switch (collection) {
    case "user":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The ID ${id} not is a User ID`,
        });
      }
      break;
    case "product":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The ID ${id} not is a Product ID`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `Collection ${collection} not processed in the SERVER`,
      });
      break;
  }
  try {
    if (model.img) {
      const pathImg = path.join(
        __dirname,
        "../uploads/",
        collection,
        model.img
      );
      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
    }

    model.img = await uploadFile(req.files, undefined, collection);
    await model.save();
    res.status(200).json({
      model,
    });
  } catch (error) {
    res.status(400).json({
      msgError: error,
    });
  }
};
const uploadPutUpdCloudinary = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;
  switch (collection) {
    case "user":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The ID ${id} not is a User ID`,
        });
      }
      break;
    case "product":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The ID ${id} not is a Product ID`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `Collection ${collection} not processed in the SERVER`,
      });
      break;
  }
  try {
    if (model.img) {
      const urlImageSplit = model.img.split("/");
      const imageName = urlImageSplit[urlImageSplit.length - 1];
      const [public_id] = imageName.split(".");
      cloudinary.uploader.destroy(public_id);
    }
    const { tempFilePath } = req.files.fileUploaded;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.img = secure_url;
    await model.save();
    res.status(200).json({
      model,
    });
  } catch (error) {
    res.status(400).json({
      msgError: error,
    });
  }
};
const uploadGetImg = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;
  switch (collection) {
    case "user":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The ID ${id} not is a User ID`,
        });
      }
      break;
    case "product":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The ID ${id} not is a Product ID`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `Collection ${collection} not processed in the SERVER`,
      });
      break;
  }
  try {
    if (model.img) {
      const pathImg = path.join(
        __dirname,
        "../uploads/",
        collection,
        model.img
      );
      if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg);
      }
    }
    const pathPlaceholder = path.join(
      __dirname,
      "../assets/No-image-found.jpg"
    );

    if (fs.existsSync(pathPlaceholder)) {
      console.log(pathPlaceholder);
      return res.sendFile(pathPlaceholder);
    } else {
      res.status(500).json({
        msg: `Problem with Image Placeholder in SERVER`,
      });
    }
  } catch (error) {
    res.status(400).json({
      msgError: error,
    });
  }
};

module.exports = {
  uploadPost,
  uploadPutUpd,
  uploadPutUpdCloudinary,
  uploadGetImg,
};
