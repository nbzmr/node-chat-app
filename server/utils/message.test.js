const expect = require('expect')

const {generateMessage, generateLocationMessage} = require('./message')

describe('generate message data', () => {
    it('should generate message data with timestamp', () => {
        const message = generateMessage('someOne', 'some text to send')
        
        expect(message.from).toBe('someOne')
        expect(message.text).toBe('some text to send')
        expect(typeof message.createdAt).toBe('number')
    })
})

describe('generateLocationMessage', () => {
    it('should return locationMessage object correctly', () => {
        const locationMessage = generateLocationMessage('someOne', {
            latitude: 1,
            longitude: 1
        })

        expect(locationMessage.from).toBe('someOne')
        expect(locationMessage.url).toBe('https://www.google.com/maps?q=1,1')
        expect(typeof locationMessage.createdAt).toBe('number')
    })
})