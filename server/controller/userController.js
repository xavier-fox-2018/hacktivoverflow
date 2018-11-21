const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()



class Controller {

    static register(req, res) {
        userModel.findOne({
            email: req.body.email
        })
            .then(data => {
                if (!data) {
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(req.body.password, salt)
                    return userModel.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        picture: 'http://localhost:3000/'+ req.file.filename,
                        interest: req.body.interest
                    })

                } else {
                    res.status(403).json({
                        errMsg: 'duplicate email'
                    })
                }
            })
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static login(req, res) {
        if (req.body.token !== undefined) {
            //INI BUAT GOOGLE SIGN
        } else {
            userModel.findOne({
                email: req.body.email
            })
                .then(data => {
                    if (data === null) {
                        res.status(401).json({errMsg: 'wrong email'})
                    } else {
                        let auth = bcrypt.compareSync(req.body.password, data.password);
                        if (auth == false) {
                            res.status(401).send({errMsg: 'wrong password'})
                        } else {
                            let token = jwt.sign(JSON.stringify(data), process.env.JWT_SECRET)
                            res.json({
                                token: token,
                                user: data.email,
                                picture: data.picture,
                                name: data.name
                            })
                        }
                    }
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        }
    }
}

module.exports = Controller


