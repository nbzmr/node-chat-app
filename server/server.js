const path = require('path')
const http = require('http')

const express = require('express')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.disable('x-powered-by')

const staticDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(staticDirectoryPath))

io.on('connection', (socket) => {
    console.log('new user connected')

    socket.on('createMessage', (createMessage) => {
        console.log(createMessage)

        io.emit('newMessage', {
            text: createMessage.text,
            from: createMessage.from,
            createdAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log('user is disconnected from the server')
    })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`server is up on port ${port}`)
})