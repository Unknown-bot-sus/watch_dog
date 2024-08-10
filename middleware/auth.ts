import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { UnAuthenticatedError } from "../errrors";
import { JWT_SECRET } from "../constant";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Invalid token");
  }

  const [, token] = authHeaders.split(" ");

  try {
    verify(token, JWT_SECRET);
    next();
  } catch (e: unknown) {
    if (e instanceof JsonWebTokenError)
      throw new UnAuthenticatedError("Invalid token");
    else throw e;
  }
}