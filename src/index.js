const express = require("express")
const path = require("path")
const socket = require("socket.io")
const fs = require("fs")

const app = express()

const PORT= process.env.PORT || 3000 

app.use(express.static(path.join(__dirname, "public")))

const server = app.listen(PORT, () => {
    console.log("Server running on port 3000")
})

const io = socket(server)

io.on("connection", (socket) => {
    console.log(`New user connected in the socket: ${socket.id}`)      

    const momento = new Date().toLocaleString()
    
    if(fs.existsSync("chat.txt")) {
        console.log("Historial de chat encontrado!")
    } else {
        fs.writeFile("chat.txt", "", () => {
            console.log("Historial creado...")
        })
    }

    socket.on("chat:message", function(data) {
        const mensajeFormateado = data.message[0].toUpperCase().concat(data.message.slice(1))

        fs.appendFile("chat.txt", `${data.username.toUpperCase()} - ${momento} \n \t ${mensajeFormateado} \n`, (err) => {
            console.log("Mensaje añadido!")
        })
        io.sockets.emit("chat:message", data)
    })

    socket.on("chat:typing", function(data) {
        socket.broadcast.emit("chat:typing", data)
    })

})

