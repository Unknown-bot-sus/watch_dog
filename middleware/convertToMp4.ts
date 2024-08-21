import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { unlink } from "fs/promises";
import { NextFunction, Request, Response } from "express";

const convertWebMToMP4 = async (inputPath: string): Promise<string> => {
    const outputPath = path.join(path.dirname(inputPath), `${path.basename(inputPath, path.extname(inputPath))}.mp4`);

    await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .output(outputPath)
            .on('end', resolve)
            .on('error', reject)
            .run();
    });

    await unlink(inputPath); // Remove the original WebM file
    return outputPath;
};

export const convertWebMToMP4Middleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        if (req.file.mimetype === "video/webm") {
            req.file.path = await convertWebMToMP4(req.file.path);
            req.file.mimetype = "video/mp4";
        }
    }

    next();
}