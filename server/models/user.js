const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
// var kue = require('kue')
//   , queue = kue.createQueue();

const userSchema = new Schema({
  name:  {
    type: String,
    required: [true, "name is required"]
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator(val) {
        var emailRegex = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
        if(!emailRegex.test(val)){
          throw new Error('your email is not valid');
        } 
      }
    },
    required: [true, "email is required"]
  },
  phone: {
    type: String,
    required: [true, "phone number is required"],
    maxlength: [13, "maximal 13 character"],
    minlength: [8, "phone number minimal 8 character"]
  },
  password: {
    type: String,
    validate: {
      validator(val) {
        var numstrRegex = new RegExp(/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/)
        if(!numstrRegex.test(val)){
          throw new Error('password must consist of string and number');
        } 
      }
    },
    required: [true, "password is required"],
    minlength: [6, "password minimal 6 character"]
  },
  statusDelete: {
    type: Boolean,
    default: false
  },
  warning: {
    type: Number,
    default: 3,
  },
  solverPoint: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

userSchema.post("validate", doc => {
  doc.password = bcrypt.hashSync(
    doc.password,
    Number(process.env.SALT_PASSWORD)
  );
});

userSchema.post("save", (doc, next) => {

  var job = queue.create('email', {
      to: `${doc.email}`, 
      from: 'harlesbayuanggara@gmail.com', 
      subject: 'welcome in harlesoverflow',
      text: 'Thanks for registration harlesoverflow',
  }).save( function(err){
    if( !err ) console.log( job.id );
  });

  queue.process('email', function(job, done){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: `${job.data.to}`,
      from: `${job.data.from}`,
      subject: `${job.data.subject}`,
      text: `${job.data.text}`,
      // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
    done()
    next()
  });
});

userSchema.post("save", (doc, next) => {

  let d = new Date(doc.createdAt);
      d.setMonth(d.getMonth() + 3);
      // d.setMinutes(d.getMinutes() + 01);

  queue.create(`greetinguser${d}`, {
    userId: `${doc._id}`,
    useremail: `${doc.email}`, 
    date: d,
  }).save( function(err){
    if( !err ) {
      next()
    }
  });

});

const User = mongoose.model('User', userSchema);

module.exports = User
