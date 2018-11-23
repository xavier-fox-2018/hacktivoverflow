const nodemailer = require('nodemailer');

const sendMail = (receiver, content) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password
        }
    });

    let mailOptions = {
        from: 'STAK OVERPLOW',
        to: receiver,
        subject: 'Daily Report',
        html: '<h1>Hai, sekarang sudah jam 5, silakan login ke M OverFlow untuk cek update terbaru dari pertaanyaan atau comment mu :)</h1>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('err: ', error);
        }
        console.log('Sent Mail: ', info);
        console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
    });
}

module.exports = sendMail;