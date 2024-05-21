const socket = io('http://localhost:3000')
const form = document.querySelector('form');

function sendMessage(e) {
    e.preventDefault()
    const input = document.querySelector('input')
    if (input.value) {
        socket.emit('message', input.value);
        input.value = ""
    }
    input.focus()
}


form.addEventListener('submit', sendMessage)

// Listen for messages 
socket.on("message", (data) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})