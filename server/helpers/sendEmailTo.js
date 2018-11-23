const nodemailer = require('nodemailer');

function sendEmailTo(sender, recipients, articleId) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.COMPANY_EMAIL,
            pass: process.env.COMPANY_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: recipients,
        subject: `Nice Answer In Stuck Overflow Forum`,
        html: `
        <h3>Nice Answer !</h3>    
        <p>Your answer in ${articleId} have received 25 upvotes</p>
        `
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Send Mail Error: ', error);
            console.log('Error Message: ', error.message);
        }

        console.log('Send Email Result: ', info);
        console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
    });
}

module.exports = sendEmailTo;