const expect = require('expect')

const {generateMessage} = require('./message')

describe('generate message data', () => {
    it('should generate message data with timestamp', () => {
        const message = generateMessage('someOne', 'some text to send')
        
        expect(message.from).toBe('someOne')
        expect(message.text).toBe('some text to send')
        expect(typeof message.createdAt).toBe('number')
    })
})