const expect = require('expect')

const {Users} = require('./users.js')

const users = new Users()

beforeEach(() => {
    users.users = [{
        id: '1',
        name: 'first',
        room: 'a'
    }, {
        id: '2',
        name: 'second',
        room: 'b'
    }, {
        id: '3',
        name: 'third',
        room: 'a'
    }] 
})

describe('Users', () => {
    it('should add new user', () => {
        const users = new Users()

        const user = {
            id: '123',
            name: 'name',
            room: 'room'
        }

        const resUser = users.addUser(user.id, user.name, user.room)

        expect(resUser).toEqual(resUser)
    })

    it('should remove user with that id we want', () => {
        users.removeUser('2')
        expect(users.removeUser('1').id).toBe('1')
        expect(users.users.length).toBe(1)
    })

    it('should not remove a user with not existing id', () => {
        users.removeUser('5')
        expect(users.removeUser('99')).toBeFalsy()
        expect(users.users.length).toBe(3)
    })

    it('should find user with existing id', () => {
        expect(users.getUser('2')).toEqual(users.users[1])
    })

    it('should not find user with not existing id', () => {
        expect(users.getUser('4')).toEqual(undefined)
    })

    it('should return users name of specific room', () => {
        expect(users.getUserList('a')).toEqual(['first', 'third'])
    })
})