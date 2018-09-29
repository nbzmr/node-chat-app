const socket = io()

socket.on('connect', () => {
    console.log('connect to the server')
})

socket.on('disconnect', () => {
    console.log('disconnected from the server')
})

socket.on('newMessage', (data) => {
    const formattedTime = moment(data.createdAt).format('h:mm a')

    const li = jQuery('<li></li>')
    li.text(`${data.from} ${formattedTime}: ${data.text}`)
    jQuery('#messages').append(li)
})

socket.on('newLocationMessage', (data) => {
    const formattedTime = moment(data.createdAt).format('h:mm a')
    const li = jQuery('<li></li>')
    const a = jQuery('<a target="_blank">my location</a>')
    
    li.text(`${data.from} ${formattedTime}: `)
    a.attr('href', data.url)
    li.append(a)
    jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault()

    const messageTextBox = jQuery('[name=message]')

    socket.emit('createMessage', {
        from: 'user',
        text: messageTextBox.val()
    }, () => {
        messageTextBox.val('')  
    })
})

const locationButton = jQuery('#send-location')

locationButton.on('click', () => {
    if (!navigator.geolocation) {
        alert('geolocation does not support in your browser')
        return
    }

    locationButton.attr('disabled', 'disabled').text('sending location...')
    
    navigator.geolocation.getCurrentPosition((data) => {
        locationButton.removeAttr('disabled').text('send location')

        socket.emit('createLocationMessage', {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude
        })
    }, () => {
        locationButton.removeAttr('disabled').text('send location')
        alert('unable to fetch location')
    })
})