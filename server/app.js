const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./routes/index.js');

require('dotenv').config();

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use('/', router);

mongoose.connect(`mongodb://zainal:${process.env.PASS_MONGODB}@ds113134.mlab.com:13134/hacktivoverflow`, {
    useNewUrlParser: true,
    useCreateIndex: true
});

app.listen(3000, () => {
    console.log('Express running on port 3000');
});