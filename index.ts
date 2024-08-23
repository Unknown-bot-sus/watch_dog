import express from "express";
import "express-async-errors";
import http from "http";
import cors from "cors";
import path from "path";

import { router as authRouter } from "./routes/auth";
import { router as deviceRouter } from "./routes/device";
import { router as detectionsRouter } from "./routes/detection";
import { PORT } from "./constant";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

const app = express();
const server = http.createServer(app);

app.use(cors());

app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.route("/").get((req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "/public/index.html"));
})

app.route("/clip").get((req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "/public/clip.html"));
})

app.route("/account").get((req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "/public/account.html"));
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/device", deviceRouter);
app.use("/api/v1/detections", detectionsRouter);

app.use(notFound);
app.use(errorHandler);

server.listen(3000, () => {
    console.log(`Server is listening on port ${PORT}`)
})  