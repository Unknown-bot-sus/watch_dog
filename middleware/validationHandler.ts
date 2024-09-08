import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateBody = (schema: z.ZodObject<any, any>) => (req: Request, res: Response, next: NextFunction) => {
    schema.parse(req.body);
    next();
}

export const validateParams = (schema: z.ZodObject<any, any>) => (req: Request, res: Response, next: NextFunction) => {
    const params: Record<string, string | number> = {...req.params};

    if (params.id) {
        params.id = Number(params.id);
    }
    
    schema.parse(req.query);
    next();
}