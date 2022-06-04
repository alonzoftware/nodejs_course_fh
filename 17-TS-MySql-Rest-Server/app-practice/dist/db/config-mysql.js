"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('node_rest_server', 'root', 'Mysql$$123', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});
exports.default = db;
//# sourceMappingURL=config-mysql.js.map