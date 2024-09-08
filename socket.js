const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    socket.on("message", message => {
        io.emit("message", `${socket.id.substring(0, 5)}: ${message}`)
    })

    socket.on("stream", data => {
        console.log(data)
    })
})

