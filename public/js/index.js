const socket = io()

socket.on('connect', () => {
    console.log('connect to the server')
})

socket.on('disconnect', () => {
    console.log('disconnected from the server')
})

socket.on('newMessage', (data) => {
    console.log(data)

   const li = jQuery('<li></li>')
   li.text(`${data.from}, ${data.text}`)
   jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault()

    socket.emit('createMessage', {
        from: 'user',
        text: jQuery('[name=message]').val()
    }, () => {

    })
})