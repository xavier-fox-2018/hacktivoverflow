const express = require('express')
const app = express()
require('dotenv').config()
// const port = process.env.PORT || 3000
const port = 3000
const cors = require('cors')
const cron = require('./helpers/cron')
const mongoose = require('mongoose')
const routes = require('./routes')


mongoose.connect('mongodb://localhost/hacktivOverflow', { useNewUrlParser: true})


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`mongoose is connected`);
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', routes)


app.listen(port, cron, () => {
    console.log(`listening on port ${port}`);
    
})

module.exports = app