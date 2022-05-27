const express = require("express");
const cors = require("cors");

const { dbConnect } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT | 8085;

    this.path = {
      user: "/api/user",
      auth: "/api/auth",
      category: "/api/category",
      product: "/api/product",
      search: "/api/search",
    };

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
    this.app.use(this.path.user, require("../routes/user"));
    this.app.use(this.path.auth, require("../routes/auth"));
    this.app.use(this.path.category, require("../routes/category"));
    this.app.use(this.path.product, require("../routes/product"));
    this.app.use(this.path.search, require("../routes/search"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}
module.exports = Server;
