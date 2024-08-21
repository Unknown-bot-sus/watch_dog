import getVideoDurationInSeconds from "get-video-duration";
import { NextFunction, Request, Response } from "express";
import { unlink } from "fs/promises";
import { BadRequestError } from "../errors";

export const checkVideoDuration = (duration: number) => async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        const videoDuration = await getVideoDurationInSeconds(req.file.path);
        if (videoDuration > duration) {
          await unlink(req.file.path);
          throw new BadRequestError(`Video length must be less than ${duration} seconds`);
        }
    } else {
        throw new BadRequestError('Failed to upload video');
    }

    next();
}