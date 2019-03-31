var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const axios = require('axios')
mongoose.connect(`${process.env.MONGODB_URL}`);
const cronJob = require('./helpers/sendMailCron')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers')

var app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter)
app.use('/answers', answersRouter)

// stream file mp3
const fs = require('fs')
// const server = require('http').createServer();
app.get('/text-to-speech/:id', function(req, res) {
  console.log('in text-to-speech route')
  const path = `./output`+req.params.id+'.mp3'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/mpeg'
    }
    res.writeHead(206, head); 
    file.pipe(res);
    setTimeout(()=>{
      fs.unlinkSync(path)
    },5000)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mpeg',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
    setTimeout(()=>{
      fs.unlinkSync(path)
    },2000)
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(()=>{
	cronJob()
  console.log('Listened on port', process.env.PORT)
})

module.exports = app;
