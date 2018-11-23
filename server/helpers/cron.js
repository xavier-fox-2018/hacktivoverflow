const cron = require('node-cron');
const mail = require('../helpers/mail')

cron.schedule('55 14 * * *', () => {    
    mail('hedya.feb@gmail.com')
    console.log('an email has been sent'); 
});

module.exports = cron