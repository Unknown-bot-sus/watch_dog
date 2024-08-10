import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "../errors";

import { MulterError } from "multer";

export async function errorHandler(
  err: CustomApiError | MulterError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomApiError) {
    return res.status(err.status as number).send({
      err: {
        message: err.message,
      },
    });
  }

  if (err instanceof MulterError) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      err: {
        message: "There was an error in uploading image",
      },
    });
  }
}