import { prisma } from "../database"
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const updateUser = async (req: Request, res: Response) => {
    const user = await prisma.user.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    const {password, ...userJson} = user;

    res.status(
        StatusCodes.OK
    ).send({
        user: userJson
    })
}