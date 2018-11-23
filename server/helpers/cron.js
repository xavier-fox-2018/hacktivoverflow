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
            console.log('cron berjalan...')
            
            sendEmailTo('marco','fmurtadho@gmail.com','superman')

            // Answer
            // .find()
            // .populate('author')
            // .then((data) => {
            //     for (var i = 0; i < data.length; i++) {
            //         if (data[i].upvotes.length === 25) {
            //             sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            //             const msg = {
            //                 to: data[i].author.email,
            //                 from: 'fmurtadho@gmail.com',
            //                 subject: 'Halo!',
            //                 text: 'I hope you write back',
            //                 html: '<p>Your answer have received 25 upvotes, seems like a lot of people helped by you!</p>',
            //             }
            //             sgMail.send(msg)
            //         } else if (data[i].downvotes.length > 25) {
            //             sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            //             const msg = {
            //                 to: data[i].author.email,
            //                 from: 'fmurtadho@gmail.com',
            //                 subject: 'Halo!',
            //                 text: 'I hope you write back',
            //                 html: '<p>Your answer have received 25 downvotes, please improve your answer quality :)</p>',
            //             }
            //             sgMail.send(msg)
            //         }
            //     }
            // })
            // .catch((err) => {
            //     console.log(err)
            // })
            console.log('cron selesai')
        }, null, true, 'Asia/Jakarta')
    }
}
