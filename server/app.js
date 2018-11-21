const express  = require('express')
const routes   = require('./routes')
const sendEmail = require('./helpers/cron').sendemail

//ROUTES REQUIRE
const userRoutes = require('./routes/users')
const categoryRoutes = require('./routes/category')

//PET OVERFLOW
const questionRoutes = require('./routes/question')
const answerRoutes = require('./routes/answer')
const actionRoutes = require('./routes/action')


const mongoose = require('mongoose')
const cors     = require('cors')
require('dotenv').config()
const app = express()

// mongoose.connect(process.env.MY_LOCAL_MONGODB, { useNewUrlParser: true });
mongoose.connect(process.env.MY_MLAB_MONGODB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo failed to connect:'));
db.once('open', function() {
  console.log('mongo connected')
});

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

//ROUTES
app.use('/', routes)
app.use('/users',userRoutes)
app.use('/categories',categoryRoutes)

//PET OVERFLOW
app.use('/questions',questionRoutes)
app.use('/answers',answerRoutes)
app.use('/actions',actionRoutes)

// app.listen(process.env.port, function(){
//   console.log('listening on port',process.env.port)
// })
app.listen(process.env.port,function(){
  console.log('listening on port',process.env.port)
  sendEmail()
})



module.exports = app;