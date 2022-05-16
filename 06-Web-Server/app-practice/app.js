const express = require("express");
const app = express();
const port = 8085;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/templated-roadtrip", (req, res) => {
  res.sendFile(__dirname + "/public/templated-roadtrip");
});

app.get("*", (req, res) => {
  res.send("ERROR 404 | PAGE NOT FOUND");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
