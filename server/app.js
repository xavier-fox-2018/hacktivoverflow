require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const indexRouter = require('./routes/indexRouter.js');
const userRouter = require('./routes/userRouter.js');
const questionRouter = require('./routes/questionRouter.js');
const answerRouter = require('./routes/answerRouter.js');
const cron = require('./helpers/cron');

// mongoose.connect('mongodb://localhost/hacktivxoverflow', {useNewUrlParser: true});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection Error:'));
// db.once('open', function() {
//     console.log('Connected to MongoDB');
// });

var mongodbUri = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds043487.mlab.com:43487/hacktiv_x_overflow`;
mongoose.connect(mongodbUri, {
    useNewUrlParser: true
});

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/questions', questionRouter);
app.use('/answers', answerRouter);

app.listen(port, cron, function() {
    console.log('Listening on port', port);
});