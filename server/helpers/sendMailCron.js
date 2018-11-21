const CronJob = require('cron').CronJob;
const sgMail = require('@sendgrid/mail')
require('dotenv').config({ path: require('find-config')('.env') })

//cron terkirim jika user memiliki total vote question < -5 cek jika jm 00.00 pagi ada user yg memenuhi kriteria.
module.exports = function sendEmail() {
  new CronJob('0 0 * * *',function(){
    console.log('cron terpanggil.......')
    Question.find({}).populate('questioner').
    then((data)=>{
      for(var i=0;i<data.length;i++){
        if(data[i].userLikes.length - data[i].userDislikes.length < -5)
        {
          sgMail.setApiKey(process.env.SENDGRID_API_KEY)
          const msg = {
              to: data[i].questioner.email,
              from: 'webappagung@gmail.com',
              subject: 'Good Morning, Mr/Ms.'+data[i].questioner.username,
              text: 'WARNING.....!!!',
              html: `<p>Your Question apparently is being hated by other users , please consider to change/edit your question , 
              Lastly, Keep Posting! </p>`,
          }
          sgMail.send(msg)
        }
      }
    })
    .then((err)=>{
      console.log(err)
    })
  }, null, true, 'Asia/Jakarta')
}
 