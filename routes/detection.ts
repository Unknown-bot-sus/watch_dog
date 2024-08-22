import { Router } from "express";
import { createDetection, deleteDetection, getDetections } from "../controllers/detection";
import { upload } from "../middleware/videoUpload";
import { checkVideoDuration } from "../middleware/checkVideoDuration";
import { convertWebMToMP4Middleware } from "../middleware/convertToMp4";

export const router = Router();

router.route("/").get(getDetections).post(upload.single("video"), convertWebMToMP4Middleware,  checkVideoDuration(20), createDetection);

router.route("/:id").delete(deleteDetection);