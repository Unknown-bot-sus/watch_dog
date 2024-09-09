import { Request, Response } from "express";
import { prisma } from "../database";
import { StatusCodes } from "http-status-codes";
import { unlink } from "fs/promises";
import { sendEmail } from "../utils/email";
import { SENDER_EMAIL, TRANSPORTER } from "../constant";

export const createDetection = async (req: Request, res: Response) => {
    try {
        const detection = await prisma.detection.create({
            data: {
                ...req.body,
                video: req.file?.path,
                deviceId: Number(req.body.deviceId)
            }
        })

        const videourl = req.protocol + '://' + req.get('host') + '/' + detection.video.replace('\\', '/');
        const description = `${detection.description}
Please check the video at the following link: ${videourl}
`
        await sendEmail(TRANSPORTER, SENDER_EMAIL, res.locals.user.email, "Subject", description);

        res.status(StatusCodes.CREATED).send({
            detection
        })
    } catch (err) {
        unlink(req.file?.path as string)
        throw err
    }
}

export const getDetections = async (req: Request, res: Response) => {
    const detections = await prisma.detection.findMany({
        where: {
            device: {
                userId: Number(req.query.userId)
            },
        },
        include: {
            device: {
                select: {
                    name: true
                }
            }
        }
    })

    res.status(StatusCodes.OK).send({
        detections
    })
}

export const deleteDetection = async (req: Request, res: Response) => {
    await prisma.detection.delete({
        where: {
            id: Number(req.params.id)
        }
    })

    res.status(StatusCodes.NO_CONTENT).send();
}
