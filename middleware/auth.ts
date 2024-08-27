import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, JwtPayload, verify } from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors";
import { JWT_SECRET } from "../constant";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Invalid token");
  }

  const [, token] = authHeaders.split(" ");

  try {
    const decoded = verify(token, JWT_SECRET) as JwtPayload;
    res.locals.user = decoded;
    next();
  } catch (e: unknown) {
    if (e instanceof JsonWebTokenError)
      throw new UnAuthenticatedError("Invalid token");
    else throw e;
  }
}