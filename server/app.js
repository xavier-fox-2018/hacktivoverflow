require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const app = express();
const indexRouter = require('./routes/index');
const cors = require('cors')

// const database = process.env.DATABASE
const database = 'mongodb://hacktiv8:hacktiv8@ds147497.mlab.com:47497/hacktivoverflow'
mongoose.connect(database)
// mongoose.connect('mongodb://localhost/overflow')
const db = mongoose.connection;
db.on(`error`, console.error.bind(console, `connection error`))
db.once (`open`, ()=> console.log(`Database is Connecting`))

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


module.exports = app;
