import express from "express";
import "express-async-errors";
import http from "http";
import cors from "cors";
import path from "path";

import { router as videoUpload } from "./routes/videoUpload";
import { PORT } from "./constant";

const app = express();
const server = http.createServer(app);

app.use(cors());

app.use(express.static(path.join(__dirname, "public")))

app.route("/").get((req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/public/index.html"))
})

app.use("/upload", videoUpload);

server.listen(3000, () => {
    console.log(`Server is listening on port ${PORT}`)
})  