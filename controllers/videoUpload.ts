import { Request, Response } from "express";
import getVideoDurationInSeconds from "get-video-duration";
import { unlink } from "fs/promises";

export const videoUpload = async (req: Request, res: Response) => {
    if (req.file) {
        const duration = await getVideoDurationInSeconds(req.file.path);
        if (duration > 20) {
          unlink(req.file.path);
          res.status(400).json({
            message: 'Failed to upload video'
          });
        }
        else {
          res.json({
            message: 'Video uploaded successfully!',
          });
        }
      } else {
        res.status(400).json({
          message: 'Failed to upload video'
        });
      }
}