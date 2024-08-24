import { Router } from "express";
import { updateUser } from "../controllers/user";

export const router = Router();

router.route("/:id").put(updateUser);