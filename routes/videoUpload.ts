import { upload } from "../middleware/videoUpload";
import { videoUpload } from "../controllers/videoUpload";
import { Router } from "express";

export const router = Router();

router.route('/').post(upload.single("video"), videoUpload);