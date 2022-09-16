const socket = io()

const message = document.getElementById("message")
const username = document.getElementById("username")
const button = document.getElementById("enviar")
const output = document.getElementById("output")
const actions = document.getElementById("actions")

button.addEventListener("click", () => {
    socket.emit("chat:message", {
        message: message.value,
        username: username.value
    })
    message.value = ""
})

message.addEventListener("keypress", () => {
    socket.emit("chat:typing", username.value)
})

socket.on("chat:message", (data) => {
    actions.innerHTML = ""
    output.innerHTML += `
        <p>
            <strong>${data.username}</strong>: ${data.message}
        </p>
    `
})

socket.on("chat:typing", (data) => {
    actions.innerHTML = `
        <p>
            <strong>${data}</strong> esta escribiendo...
        </p>
    `
})