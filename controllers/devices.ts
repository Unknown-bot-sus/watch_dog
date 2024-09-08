import { Request, Response } from "express"
import { prisma } from "../database"
import { StatusCodes } from "http-status-codes";
import { UnAuthorizedError } from "../errors";
import { unlink } from "fs/promises"

export const getDevice = async (req: Request, res: Response) => {
    const device = await prisma.device.findFirstOrThrow({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(StatusCodes.OK).send({
        device
    })
}

export const getDevices = async (req: Request, res: Response) => {
    if (res.locals.user.id !== Number(req.query.userId)) {
        throw new UnAuthorizedError("You are not authorized to view this resource")
    }
    
    const devices = await prisma.device.findMany({
        where: {
            userId: Number(req.query.userId)
        },
    })

    res.status(StatusCodes.OK).send({
        devices
    })
}

export const createDevice = async (req: Request, res: Response) => {
    const device = await prisma.device.create({
        data: req.body
    })

    res.status(StatusCodes.CREATED).send({
        device
    })
}

export const deleteDevice = async (req: Request, res: Response) => {
    const [detections] = await prisma.$transaction([
        prisma.detection.findMany({
            where: {
                deviceId: Number(req.params.id)
            },
            select: {
                video: true
            }
        }),
        prisma.detection.deleteMany({
            where: {
                deviceId: Number(req.params.id)
            }
        }),
        prisma.device.delete({
            where: {
                id: Number(req.params.id)
            }
        }),
    ])
    
    for (let i = 0; i < detections.length; i++) {  
        unlink(detections[i].video);
    }

    res.status(StatusCodes.NO_CONTENT).send()
}

export const updateDevice = async (req: Request, res: Response) => {
    const device = await prisma.device.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(
        StatusCodes.OK
    ).send({
        device
    })
}