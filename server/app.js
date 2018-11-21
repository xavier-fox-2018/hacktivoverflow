const express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    bodyParser= require('body-parser'),
    port = process.env.PORT || 3000,
    axios = require('axios'),
    app = express()

const userRouter = require('./routes/user'),
      questionRouter = require('./routes/question')

mongoose.connect('mongodb://localhost:27017/hacktivoverflow', { useNewUrlParser: true});

app
    .use(express.json({limit: '50mb'}))
    .use(express.urlencoded({ extended: false }))

    .use(cors())

    .use('/', userRouter)
    .use('/question', questionRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})