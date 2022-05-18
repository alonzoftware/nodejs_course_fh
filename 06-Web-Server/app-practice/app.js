require("dotenv").config();
//EXPRESS ==================
const express = require("express");
const app = express();
//HANDLEBARS ==============
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.render("home", {
    titlePage: "Test Page",
    nameAuthor: "Alonzo",
  });
});

app.get("/templated-roadtrip", (req, res) => {
  res.sendFile(__dirname + "/public/templated-roadtrip");
});
app.get("/elements", (req, res) => {
  res.render("elements", {
    titlePage: "Test Page",
    nameAuthor: "Alonzo",
  });
});
app.get("/generic", (req, res) => {
  res.render("generic", {
    titlePage: "Test Page",
    nameAuthor: "Alonzo",
  });
});

app.get("*", (req, res) => {
  res.send("ERROR 404 | PAGE NOT FOUND");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
