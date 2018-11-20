const cron = require('node-cron');
const Answer = require('../models/answerModel.js');

// Delete poor answers with total value less than minus 50 every week
// at 00:00 on Sunday.
// '0 0 * * 0'

cron.schedule('0 0 * * 0', function(req, res) {
    Answer.find()
        .then(function(answers) {
            for (let i = 0; i < answers.length; i++) {
                let totalVotes = answers[i].upvotes.length - answers[i].downvotes.length;
                if (totalVotes < -50) {
                    Answer.deleteOne({_id: answers[i]._id})
                        .then(function(result) {
                            console.log('Answer with total votes less than -50 has been deleted');
                            res.status(200).json({
                                success: true,
                                message: 'Answer with total votes less than -50 has been deleted'
                            });
                        })
                        .catch(function(err) {
                            console.log('Delete Answer In Cron Error: ', err);
                            res.status(500).json(err);
                        });
                }
            }
        })
        .catch(function(err) {
            console.log('Find All Answers In Cron Error: ', err);
            res.status(500).json(err);
        });
});

module.exports = cron;