const nodemailer = require('nodemailer');

const mailSendingProcess = (receiver, content) => {
    let sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password
        }
    });

    let mailOptions = {
        from: 'Stack Overflow',
        to: receiver,
        subject: 'Report',
        html: '<h1>Hi there</h1>'
    };

    sender.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error: ', error);
        }
        console.log('info', info, nodemailer.getTestMessageUrl(info));
    });
}

module.exports = mailSendingProcess;