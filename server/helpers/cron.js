const CronJob = require('cron').CronJob
const sgMail = require('@sendgrid/mail')

module.exports = function sendEmail(email) {
    new CronJob('*/1 */7 * * */6', function() {
    sgMail.setApiKey(process.env.SENDGRID)
    const msg = {
        to: email,
        from: 'khairulba21@gmail.com',
        subject: 'Welcome To Hacktiv Overflow',
        text: 'Thanks for register',
        html: `<strong><p>Thanks for register </p></strong>`
    }
    console.log(`berhasil`);
    
    sgMail.send(msg)
  }, null, true, 'Asia/Jakarta');
}
