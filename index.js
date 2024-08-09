const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");

const { PORT } = require("./constant");
const videoUpload = require("./routes/videoUpload")

const app = express();
const server = http.createServer(app);

app.use(cors());

app.use(express.static(path.join(__dirname, "public")))

app.route("/").get((req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/public/index.html"))
})

app.use("/upload", videoUpload)


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})  