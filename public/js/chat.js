const socket = io()

const scrollToBottom = () => {
    const messages = jQuery('#messages')
    const newMessage = messages.children('li:last-child')

    const clientWindowHeight = messages.prop('clientHeight')
    const topScrollHeight = messages.prop('scrollTop')
    const scrollHeight = messages.prop('scrollHeight')
    const newMessageHeight = newMessage.innerHeight()
    const lastMessageHeight = newMessage.prev().innerHeight()

    if (clientWindowHeight + topScrollHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', () => {
    const deparam = jQuery.deparam(window.location.search)

    socket.emit('join', deparam, (err) => {
        if (err) {
            alert('pleas insert valid name or room name')
            window.location.href = '/'
        } else {
            console.log('hi')
        }
    })
})

socket.on('disconnect', () => {
    console.log('disconnected from the server')
})

socket.on('newUserList', (data) => {
    const ol = jQuery('<ol></ol>')

    data.forEach((current) => {
        console.log(current)
        ol.append(jQuery('<li></li>').text(current))
    })

    jQuery('#users').html(ol)
})

socket.on('newMessage', (data) => {
    const formattedTime = moment(data.createdAt).format('h:mm a')
    const template = jQuery('#message-template').html()
    const html = Mustache.render(template, {
        from: data.from,
        text: data.text,
        createdAt: formattedTime
    })
    
    jQuery('#messages').append(html)

    scrollToBottom()

    // const li = jQuery('<li></li>')
    // li.text(`${data.from} ${formattedTime}: ${data.text}`)
    // jQuery('#messages').append(li)
})

socket.on('newLocationMessage', (data) => {
    const formattedTime = moment(data.createdAt).format('h:mm a')
    const template = jQuery('#location-message-template').html()
    const html = Mustache.render(template, {
        from: data.from,
        url: data.url,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html)

    scrollToBottom()

    // const li = jQuery('<li></li>')
    // const a = jQuery('<a target="_blank">my location</a>')
    
    // li.text(`${data.from} ${formattedTime}: `)
    // a.attr('href', data.url)
    // li.append(a)
    // jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault()

    const messageTextBox = jQuery('[name=message]')

    socket.emit('createMessage', {
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