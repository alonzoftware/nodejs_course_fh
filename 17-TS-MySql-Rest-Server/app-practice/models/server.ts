import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';
import db from '../db/config-mysql';


class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        userPath: "/api/user"
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8085';
        //DB Connection
        this.dbMySQLConnection();
        //Middlewares
        this.middlewares();

        this.routes();

    }
    async dbMySQLConnection() {
        try {
            await db.authenticate();
            console.log('Database MySQL - ONLINE');

        } catch (err) {
            if (err instanceof Error) {
                // ✅ TypeScript knows err is Error
                console.log(err.message);
            } else {
                console.log('Unexpected error', err);
            }
        }
    }
    middlewares() {
        //cors
        this.app.use(cors());
        //Read and Parse JSON BODY
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.userPath, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in PORT ${this.port}`);
        })
    }
}

export default Server;