import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function generateGetAll(req: Request, res: Response)  {
  return async (req: Request, res: Response) => {
    const query = req.query;

    const size = query.size !== undefined ? parseInt(query.size as string) : query.size;
    const page = query.page !== undefined ? parseInt(query.page as string) : query.page;

    let totalPage: number = 1;

    if (query.src) {

    } else {
    }
  }
}

export async function generalGetAll(model: any, req: Request, size?: number, page?: number) {

}