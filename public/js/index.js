const socket = io()

socket.on('connect', () => {
    console.log('connect to the server')
})

socket.on('disconnect', () => {
    console.log('disconnected from the server')
})

socket.on('newMessage', (newEmail) => {
    console.log(newEmail)
})