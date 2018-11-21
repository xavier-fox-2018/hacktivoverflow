const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

let Check = function (req, res, next) {
    let data = jwt.verify(req.body.token, process.env.JWT_SECRET)
    if (!req.body.token) {
        res.status(401).json({errMsg:'unathorize'})        
    } else {
        userModel.find({
            email: data.email
        })
            .then(data => {
                if (data.length == 0) {
                    res.status(401).json({errMsg:'unathorize'})
                } else {
                    next()
                }
            })
    }
}

module.exports = Check