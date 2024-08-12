import { PrismaClient } from "@prisma/client";
import { compareHash, hashMessage } from "./utils/hashMessage";
import { create } from "domain";
import { sign } from "jsonwebtoken";
import { JWT_LIFETIME, JWT_SECRET } from "./constant";

export const prisma = new PrismaClient().$extends({
    query: {
        user: {
            async create({ args, query}) {
                args.data.passwrod = await hashMessage(args.data.passwrod);
                return query(args)
            }
        }
    },
    model: {
        user: {
            async comparePassword(password: string, hashedPassword: string) {
                return await compareHash(password, hashedPassword);
            },

            async createJWT(id: number) {
                return sign(
                    {id},
                    JWT_SECRET,
                    {expiresIn: JWT_LIFETIME}
                )
            }
        }
    }
});