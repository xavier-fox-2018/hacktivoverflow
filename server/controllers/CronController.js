const Question = require('../models/Question')
const User = require('../models/User')

class CronController {
    static sendMail(req, res) {
        // Question.find({})
        //         .populate('user')
        // .then(users => {
        //     res.json(users)
        //     console.log(users)
        // })
        User.find()
        .then(users => {
            let emails = users.map(item => item.email)
            res.json(emails)
        })
    }
}

module.exports = CronController