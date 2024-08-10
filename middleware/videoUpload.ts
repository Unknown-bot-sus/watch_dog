import multer, { FileFilterCallback } from "multer";
import { Request } from "express"
import path from "path";
import { createUniqueId } from "../utils/idCreater";
import { BadRequestError } from "../errors";

// Set up the storage destination and file naming convention
const storage = multer.diskStorage({
  destination: "./videos",
  filename: function (req, file, cb) {
    const uniqueSuffix = createUniqueId();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter for video files (optional but recommended)
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedFileTypes = /mp4|avi|mkv|mov/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
      return cb(null, true);
  } 

  throw new BadRequestError(`${file.mimetype} file type is not supported`);
};

export const upload = multer({
  storage,
  fileFilter
});