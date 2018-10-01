const path = require('path')
const http = require('http')

const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message.js')
const {stringValidator} = require('./utils/validator.js')
const {Users} = require('./utils/users.js')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const users = new Users()

app.disable('x-powered-by')

const staticDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(staticDirectoryPath))

io.on('connection', (socket) => {
    socket.on('join', (data, callback) => {
        if (!stringValidator(data.name) || !stringValidator(data.room)) {
            callback('name or room name is unvalid')
            return
        }
        
        socket.join(data.room)
        users.removeUser(socket.id)
        users.addUser(socket.id, data.name, data.room)
        
        io.to(data.room).emit('newUserList', users.getUserList(data.room))
        socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'))
        socket.broadcast.to(data.room).emit('newMessage', generateMessage('admin', `"${data.name}" joined`))
    })

    socket.on('createMessage', (data, callback) => {
        const user = users.getUser(socket.id)

        if (user && stringValidator(data.text)) {
           io.to(user.room).emit('newMessage', generateMessage(user.name, data.text)) 
        }

        callback()
    })

    socket.on('createLocationMessage', (data) => {
        const user = users.getUser(socket.id)

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, data))
        }
    })
 
    socket.on('disconnect', () => {
        const removedUser = users.removeUser(socket.id)
        
        if (removedUser) {
            io.to(removedUser.room).emit('newUserList', users.getUserList(removedUser.room))
            io.to(removedUser.room).emit('newMessage', generateMessage('admin', `"${removedUser.name}" has left`))
        }
    })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`server is up on port ${port}`)
})