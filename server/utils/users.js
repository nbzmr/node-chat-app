class Users {
    constructor () {
        this.users = []
    }

    addUser (id, name, room) {
        const user = {
            id,
            name,
            room
        }

        this.users.push(user)

        return user
    }

    removeUser (id) {
        let user
        this.users.forEach((current, index) => {
            if (current.id === id) {
                this.users.splice(index, 1)
                user = current
            }
        })
        return user
    }

    getUser (id) {
        return this.users.filter((current) => current.id === id)[0]
    }

    getUserList (room) {
        const users = this.users.filter((current) => {
            return current.room === room
        })

        return users.map((current) => {
            return current.name
        })
    }
}

module.exports = {
    Users
}