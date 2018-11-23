var CronJob = require('cron').CronJob;
const Answer = require('../models/answers')
const Question = require('../models/questions')
const User = require('../models/users')
const sgMail = require('@sendgrid/mail');
require('dotenv').config()
const sendEmailTo = require('./sendEmailTo')
// 0 7 * * *

module.exports = {
    sendemail:function(){
        new CronJob('0 7 * * *',function(){
            console.log('cron running...')

            Answer
            .find()
            .populate('author')
            .then((data) => {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].upvotes.length > 25) {
                        let answerEmail = data[i].author.email
                        Question.findOne({
                            answers : data[i]._id
                        })
                        .populate('author')
                        .then((question)=>{
                            sendEmailTo(question.author.name,answerEmail,question._id)
                        })
                        .catch((error)=>{
                            console.log(error)
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
            console.log('cron done...')
        }, null, true, 'Asia/Jakarta')
    }
}
