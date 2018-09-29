const moment = require('moment')

const customTime = 123
const getTimeMethod = new Date().getTime()

const time = moment(customTime)
const time = moment(getTimeMethod)
const time = moment()

console.log(time.format('h:mm a'))