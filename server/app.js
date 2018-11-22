require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const Router = require('./routes')

const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/overflow', {
//     useNewUrlParser: true
// })
const mongodUri = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds047652.mlab.com:47652/overflow`
mongoose.connect(mongodUri, {
    useNewUrlParser: true
})
    .then(_ => {
        console.log('mongo started')
    })
    .catch(err => {
        console.log(err)
    })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', Router)


app.listen(80, () => {
    console.log('server strted on port 3000')
})
