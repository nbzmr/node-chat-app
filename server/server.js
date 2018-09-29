const path = require('path')
const http = require('http')

const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message.js')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.disable('x-powered-by')

const staticDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(staticDirectoryPath))

io.on('connection', (socket) => {
    console.log('new user connected')

    socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'))

    socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'))

    socket.on('createMessage', (data, callback) => {
        console.log(data)

        io.emit('newMessage', generateMessage(data.from, data.text))
        callback()
    })

    socket.on('disconnect', () => {
        console.log('user is disconnected from the server')
    })

    socket.on('createLocationMessage', (data) => {
        io.emit('newLocationMessage', generateLocationMessage('admin', data))
    })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`server is up on port ${port}`)
})