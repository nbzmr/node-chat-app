const moment = require('moment')

const generateMessage = (from, text) => {
    return {
        from: from,
        text: text,
        createdAt: moment().valueOf()
    }
}

const generateLocationMessage = (from, data) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${data.latitude},${data.longitude}`,
        createdAt: moment().valueOf()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}