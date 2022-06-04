import { Sequelize } from "sequelize";


const db = new Sequelize('node_rest_server', 'root', 'Mysql$$123', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

export default db;