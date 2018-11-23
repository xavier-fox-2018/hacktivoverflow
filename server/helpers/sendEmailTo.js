const nodemailer = require('nodemailer');

function sendEmailTo(recipients) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.COMPANY_EMAIL,
            pass: process.env.COMPANY_PASSWORD
        }
    });

    let mailOptions = {
        from: `"Hacktiv X Overflow" <${process.env.COMPANY_EMAIL}>`,
        to: recipients,
        subject: `Low Quality Answer Removed`,
        html: `
            <h2>
                Bad News...
            </h2>
            <p>
                Hi, we're sending you this email to notify you that your answer is received badly by our users. Unfortunately based on our agreement policy, we have to remove answers which has total votes value less than -5.
            </p>
            <p>Thank you for your patience!</p>
            <hr>
            <p>
                Should you have any queries, please contact us at this email address.
            </p>
            <p>Best Regards, </p><br />
            <p>Hacktiv X Overflow Team</p>
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