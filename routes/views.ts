import { Request, Response, Router } from "express";
import path from "path";

export const router = Router();

function serveHtml(file: string) {
    return (req: Request, res: Response) => {
        res.status(200).sendFile(path.join(process.cwd(), "/views", file));
    }
}

router.get("/", serveHtml("index.html"));
router.get("/account", serveHtml("account.html"));
router.get("/detection", serveHtml("detection.html"));
router.get("/clip", serveHtml("clip.html"));
router.get("/login", serveHtml("login.html"));
router.get("/signup", serveHtml("signup.html"));