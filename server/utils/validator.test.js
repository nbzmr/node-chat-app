const expect = require('expect')

const {stringValidator} = require('./validator.js')

describe('stringValidator function', () => {
    it('should reject non string values', () => {
        expect(stringValidator(true)).toBe(false)
    })

    it('should reject space character', () => {
        expect(stringValidator(' ')).toBe(false)
    })

    it('should return true for valid string', () => {
        expect(stringValidator('valid one')).toBe(true)
    })
})