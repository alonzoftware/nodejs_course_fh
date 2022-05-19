const express = require('express')
const cors = require('cors');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT | 8085;
        this.userPath = '/api/user';
        //Middlewares
        this.middlewares();

        this.routes();

    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })

    }

}
module.exports = Server;