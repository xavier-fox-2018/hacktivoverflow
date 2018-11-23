const cron = require('node-cron')
const mailer = require('./mailer')
const User = require('../models/User')
const Question = require('../models/Question')

cron.schedule(' 0 17 * * *', () => {
    console.log('hai cron')
    // mailer('hadiykk99@gmail.com')
    // mailer('test.hedya@gmail.com')
    User.find()
        .then(users => {
            let emails = users.map(item => item.email)
            mailer(emails)
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = cron;