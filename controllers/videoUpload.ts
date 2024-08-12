import { Request, Response } from "express";
import getVideoDurationInSeconds from "get-video-duration";
import { unlink } from "fs/promises";
import { BadRequestError } from "../errors/";

export const videoUpload = async (req: Request, res: Response) => {
    if (req.file) {
        const duration = await getVideoDurationInSeconds(req.file.path);
        if (duration > 20) {
          unlink(req.file.path);
          throw new BadRequestError("Video length must be less than 20seconds");
        }
        else {
          res.json({
            message: 'Video uploaded successfully!',
          });
        }
      } else {
        throw new BadRequestError('Failed to upload video');
      }
}