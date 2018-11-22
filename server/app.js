const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')
const mongodbUri = 'mongodb://@ds155653.mlab.com:55653/hacktivoverflow'
require('dotenv').config()

//routes
const registeration = require('./routes/registeration.js')
const question = require('./routes/question.js')
const answer = require('./routes/answer.js')
const decode = require('./routes/decode.js')

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//connect mongoose
mongoose.connect(mongodbUri,
  {
    useNewUrlParser: true,
    auth: {
      user: process.env.mlab_user,
      password: process.env.mlab_password
    }
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(('You are Mongected'));
});

//routes
app.use('/ho', registeration)
app.use('/ho/decode', decode)
app.use('/ho/question', question)
app.use('/ho/answer', answer)


app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})

module.exports = app