require('dotenv').config()
const express = require('express')
const app = express()

const Router = require('./routes')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/overflow', {
    useNewUrlParser: true
})
    .then(_ => {
        console.log('mongo started')
    })
    .catch(err => {
        console.log(err)
    })

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', Router)


app.listen(3000, () => {
    console.log('server strted on port 3000')
})
