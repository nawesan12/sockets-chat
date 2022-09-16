const express = require("express")
const path = require("path")
const socket = require("socket.io")

const app = express()

const PORT= process.env.PORT || 3000 

app.use(express.static(path.join(__dirname, "public")))

const server = app.listen(PORT, () => {
    console.log("Server running on port 3000")
})

const io = socket(server)

io.on("connection", (socket) => {
    console.log(`New user connected in the socket: ${socket.id}`)

    socket.on("chat:message", function(data) {
        io.sockets.emit("chat:message", data)
    })

    socket.on("chat:typing", function(data) {
        socket.broadcast.emit("chat:typing", data)
    })

})

