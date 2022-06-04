"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDel = exports.userPut = exports.userPost = exports.userGetById = exports.userGet = void 0;
const userdb_1 = __importDefault(require("../models/userdb"));
const userGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userdb_1.default.findAll();
    res.status(200).json({
        msg: `userGet`,
        users,
    });
});
exports.userGet = userGet;
const userGetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield userdb_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: `ID ${id} Not Exist`,
        });
    }
    res.status(200).json({
        msg: `userGetByID`,
        user,
    });
});
exports.userGetById = userGetById;
const userPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existEmail = yield userdb_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existEmail) {
            return res.status(400).json({
                msg: 'The Email Must be unique - Email Sended:' + body.email
            });
        }
        const user = yield userdb_1.default.create({
            name: body.name,
            email: body.email,
            status: body.status
        });
        res.json(user);
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador' + error
        });
    }
});
exports.userPost = userPost;
const userPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield userdb_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield user.update(body);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.userPut = userPut;
const userDel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield userdb_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: 'No existe un user con el id ' + id
        });
    }
    yield user.update({ status: false });
    // await user.destroy();
    res.json(user);
});
exports.userDel = userDel;
//# sourceMappingURL=user.js.map