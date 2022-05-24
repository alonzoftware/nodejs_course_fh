const express = require("express");
const cors = require("cors");

const { dbConnect } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT | 8085;
    this.userPath = "/api/user";
    this.authPath = "/api/auth";
    //Connect to Database
    this.connectDatabase();
    //Middlewares
    this.middlewares();

    this.routes();
  }
  async connectDatabase() {
    await dbConnect();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.userPath, require("../routes/user"));
    this.app.use(this.authPath, require("../routes/auth"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}
module.exports = Server;
