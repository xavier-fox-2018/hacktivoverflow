const cron = require('node-cron');
const Answer = require('../models/answerModel.js');
const sendEmailTo = require('../helpers/sendEmailTo.js');

// Delete poor answers with total votes value less than minus 5 every week
// at 00:00 on Sunday.
// '0 0 * * 0'

cron.schedule('0 0 * * 0', function() {
    let toBeDeleted = [];
    let userEmails = [];
    Answer.find().populate('user')
        .then(function(answers) {
            for (let i = 0; i < answers.length; i++) {
                let totalVotes = answers[i].upvotes.length - answers[i].downvotes.length;
                if (totalVotes <= -5) {
                    toBeDeleted.push(answers[i]._id);
                    userEmails.push(answers[i].user.email);
                }
            }

            console.log('tobeDeleted:', toBeDeleted);
            console.log('userEmails:', userEmails);

            Answer.deleteMany({_id: {
                $in: toBeDeleted
            }})
                .then(function(result) {
                    console.log('Cron Delete Many Result:', result);
                    sendEmailTo(userEmails);
                })
                .catch(function(err) {
                    console.log('Cron Delete Many Error:', err);
                });
        })
        .catch(function(err) {
            console.log('Find All Answers In Cron Error:', err);
            res.status(500).json(err);
        });
});

module.exports = cron;