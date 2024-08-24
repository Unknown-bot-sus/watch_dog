import { Request, Response, Router } from "express";
import path from "path";

export const router = Router();

function serveHtml(file: string) {
    return (req: Request, res: Response) => {
        res.status(200).sendFile(file);
    }
}

router.get("/", serveHtml(path.join(process.cwd(), "/public/index.html")));
router.get("/account", serveHtml(path.join(process.cwd(), "/public/account.html")));
router.get("/detection", serveHtml(path.join(process.cwd(), "/public/detection.html")));
router.get('/clip', serveHtml(path.join(process.cwd(), "/public/clip.html")));
