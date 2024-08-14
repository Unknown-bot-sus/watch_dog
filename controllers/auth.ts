import { Request, Response} from "express"
import { prisma } from "../database"
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors"
import { StatusCodes } from "http-status-codes";

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new BadRequestError("Email and password must be provided");
    }

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (!user) {
        throw new NotFoundError("User not found")
    }

    const isPasswordCorrect = await prisma.user.comparePassword(password, user.password);

    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError("Invalid credentials");
    }

    const token = await prisma.user.createJWT(user.id);
    const { password: _, ...jsonUser} = user;
    res.status(StatusCodes.OK).send({
        user: jsonUser,
        token,
    })
}

export const signUp = async (req: Request, res: Response) => {
    const user = await prisma.user.create({
        data: req.body
    });

    const {password, ...userJson} = user;

    res.status(StatusCodes.CREATED).send({
        user: userJson
    })
}