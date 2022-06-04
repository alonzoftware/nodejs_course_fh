import { Request, Response } from "express";
import User from "../models/userdb";

export const userGet = async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.status(200).json({
        msg: `userGet`,
        users,
    });

}
export const userGetById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: `ID ${id} Not Exist`,
        })
    }
    res.status(200).json({
        msg: `userGetByID`,
        user,
    });
}

export const userPost = async (req: Request, res: Response) => {
    const { body } = req;

    try {

        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        });
        if (existEmail) {
            return res.status(400).json({
                msg: 'The Email Must be unique - Email Sended:' + body.email
            });
        }
        const user = await User.create({
            name: body.name,
            email: body.email,
            status: body.status
        });


        res.json(user);


    } catch (error) {

        // console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador' + error
        })
    }
}
export const userPut = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await user.update(body);

        res.json(user);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}
export const userDel = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: 'No existe un user con el id ' + id
        });
    }
    await user.update({ status: false });
    // await user.destroy();
    res.json(user);

}