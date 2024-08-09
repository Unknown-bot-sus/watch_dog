import { Request, Response } from "express";

export const videoUpload = (req: Request, res: Response) => {
    if (req.file) {
        res.json({
          message: 'Video uploaded successfully!',
        });
      } else {
        res.status(400).json({
          message: 'Failed to upload video'
        });
      }
}