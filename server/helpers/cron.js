const cron = require("node-cron");
var Question = require('../models/questions.js');
let nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "pairprojectxavier@gmail.com",
        pass: "naonweah1!"
    }
});
//sent every wednesday at 17:53
cron.schedule("20 18 * * 3", function() {
    Question.find({}).populate('user_id')
        .then((questions) => {
            questions.forEach(question => {
                if (question.upvotes.length == 0) {
                    Question.deleteOne({ _id: question._id })
                        .then((result) => {
                            console.log('question has been deleted');
                        }).catch((err) => {
                            console.log(err);
                        });
                }
            });
        }).catch((err) => {
            console.log(err);
        });
});

module.exports = cron;