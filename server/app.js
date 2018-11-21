require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection
const cors = require('cors')
const port = process.env.PORT || 3000
mongoose.connect('mongodb://localhost:27017/hacktivoverflow', {useNewUrlParser:true})
//CONFIG FOR  MLAB
// const mongodUri = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds059634.mlab.com:59634/blog`
// mongoose.connect(mongodUri, {useNewUrlParser: true})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.listen(port, function(){
    console.log(`Hello express from port : ${port}`)
})

const QuestionRoutes = require('./routes/QuestionRoutes')
const AuthRoutes = require('./routes/AuthRoutes')
const UsersRoutes = require('./routes/UserRoutes')
// const ArticleRoutes = require('./routes/articles')
app.use('/questions', QuestionRoutes)
app.use('/auth',AuthRoutes)
app.use('/users',UsersRoutes)

// app.use('/articles', ArticleRoutes)
// console.log(process.env.MLAB_USER)