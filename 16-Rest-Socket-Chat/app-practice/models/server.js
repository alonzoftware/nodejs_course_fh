const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { socketController } = require("../sockets/socket-controller");

const { dbConnect } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT | 8085;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.path = {
      user: "/api/user",
      auth: "/api/auth",
      category: "/api/category",
      product: "/api/product",
      search: "/api/search",
      upload: "/api/upload",
    };

    //Connect to Database
    this.connectDatabase();
    //Middlewares
    this.middlewares();

    this.routes();
    //Sockets
    this.sockets();
  }
  async connectDatabase() {
    await dbConnect();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.path.user, require("../routes/user"));
    this.app.use(this.path.auth, require("../routes/auth"));
    this.app.use(this.path.category, require("../routes/category"));
    this.app.use(this.path.product, require("../routes/product"));
    this.app.use(this.path.search, require("../routes/search"));
    this.app.use(this.path.upload, require("../routes/upload"));
  }

  sockets() {
    // this.io.on("connection", (socket) => socketController(socket, this.io));
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}
module.exports = Server;
