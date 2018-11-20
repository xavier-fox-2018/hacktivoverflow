var CronJob = require('cron').CronJob;
const Answer = require('../models/answers')
const Question = require('../models/questions')
const User = require('../models/users')
const sgMail = require('@sendgrid/mail');
require('dotenv').config()
// 0 0 7 * * *

module.exports = {
    sendemail:function(){
        new CronJob('0 0 7 * * *',function(){
            Answer
            .find()
            .populate('author')
            .then((data) => {
                for (var i = 0; i < data.length; i++) {
                    // console.log(data[i].upvotes.length)
                    if (data[i].upvotes.length === 2) {
                        // console.log(data[i].author.email)
                        // console.log(data[i].author.name)
                        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                        const msg = {
                            to: data[i].author.email,
                            from: 'fmurtadho@gmail.com',
                            subject: 'Halo!',
                            text: 'I hope you write back',
                            html: '<p>Your answer have received 25 upvotes, seems like a lot of people helped by you!</p>',
                        }
                        sgMail.send(msg)
                    } else if (data[i].downvotes.length > 25) {
                        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                        const msg = {
                            to: data[i].author.email,
                            from: 'fmurtadho@gmail.com',
                            subject: 'Halo!',
                            text: 'I hope you write back',
                            html: '<p>Your answer have received 25 downvotes, please improve your answer quality :)</p>',
                        }
                        sgMail.send(msg)
                    }
                }
            })
            .then((err) => {
                console.log(err)
            })
        }, null, true, 'Asia/Jakarta')
    }
}
