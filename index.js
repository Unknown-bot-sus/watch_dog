const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");

const { PORT } = require("./constant");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors());

app.use(express.static(path.join(__dirname, "public")))

app.route("/").get((req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/public/index.html"))
})

io.on("connection", (socket) => {
    socket.on("message", message => {
        io.emit("message", `${socket.id.substring(0, 5)}: ${message}`)
    })

    socket.on("stream", () => {
        
    })
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})  