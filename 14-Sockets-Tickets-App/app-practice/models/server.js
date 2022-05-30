const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controller");

class Server {
    constructor() {
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.port = process.env.PORT | 8085;

        this.path = {
        };
        //Middlewares
        this.middlewares();

        this.routes();
        this.sockets();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.static("public"));
    }

    routes() {
        // this.app.use(this.path.user, require("../routes/user"));
    }
    sockets() {
        this.io.on('connection', socketController);
        // this.io.on('connection', socket => {
        //     console.log(`Client Connected ${socket.id}`);

        //     socket.on('disconnect', () => {
        //         console.log(`Client Disconnected ${socket.id}`);
        //     });
        //     socket.on('send-message', (payload, callback) => {
        //         // console.log(payload);
        //         // socket.broadcast.emit('send-message', payload);
        //         const id = 12345;
        //         this.io.emit('send-message', payload);
        //         callback(id);
        //     });

        // });

    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}
module.exports = Server;
