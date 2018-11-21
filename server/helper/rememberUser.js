// const CronJob = require('cron').CronJob;
// const User = require("../models/user")
// const Question = require("../models/question")
// const sgMail = require('@sendgrid/mail');
// const nodemailer = require('nodemailer');
// var kue = require('kue')
//   , queue = kue.createQueue();

// module.exports = function checkContent () {
//   new CronJob('* * * * * *',() =>{

//     queue.process(`greetinguser${new Date()}`, (job, done) => {
     
//       Question.find({ postBy : job.data.userId })
//       .populate("postBy")
//       .then((question) => {
     
//         sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//         const msg = {
//           to: `${job.data.useremail}`,
//           from: `harlesbayuanggara@gmail.com`,
//           subject: `Hello Member`,
//           html: `
//           <p>Terimakasih atas kontribusinya selama 3 bulan di harlesoverflow</p>
//           <strong>Jumlah quesion anda saat ini ${question.length}</strong>
//           <br/>>
//           Terus berkontribusi pada situs kami
//           `
//           ,
//         };
//         sgMail.send(msg);
        
//         done()
        
//       }).catch((err) => {
//         console.log(err)
//       });
      
      
//     });

//   }, null, true, 'Asia/Jakarta');
// }
