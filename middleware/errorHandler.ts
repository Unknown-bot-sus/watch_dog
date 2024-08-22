import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "../errors";

import { MulterError } from "multer";
import { Prisma } from "@prisma/client";

export async function errorHandler(
  err: CustomApiError | MulterError | Prisma.PrismaClientKnownRequestError,
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

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      return res.status(StatusCodes.NOT_FOUND).send({
        err: {
          message: err.message
        }
      })
    }
  }

  console.log(err)

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    err: {
      message: "Internal sever error"
    }
  })
}