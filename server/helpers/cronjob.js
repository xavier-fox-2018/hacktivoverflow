const CronJob = require('cron').CronJob
const User = require("../models/users")
const Question = require('../models/questions')
function backgroundJob () {
  // Delete question when its get -30 votes in 07:15 AM
  new CronJob('15 7 * * *', function() {
    console.log('cronStart')
    Question.find()
      .then(data => {
        data.forEach(element => {
          let countVotes = 0
          element.votes.forEach(vote => {
            countVotes += vote.value
          })
          if (countVotes < -30) {
            Question.findOneAndDelete({
              _id: element._id
            })
              .then(question => {
                console.log('question deleted')
              })
              .catch(error => {
                console.log(error)
              })
          }
        })
      })
      console.log('cronDown')
  }, null, true, 'Asia/Jakarta')
}

module.exports = backgroundJob