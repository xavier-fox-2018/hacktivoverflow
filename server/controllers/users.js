require('dotenv').config()
var jwt = require('jsonwebtoken')
var User = require('../models/users.js')
var Helper = require('../helpers/index.js')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
class UserController {
    static signup(req, res) {
        User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                oauth: false,
                image: undefined
            })
            .then((createdUser) => {
                res.status(200).json(createdUser)
            })
            .catch((err) => {
                res.status(400).json({
                    message: err
                })
            })

    }
    static signin(req, res) {
        User.findOne({ email: req.body.email })
            .then(function(data) {
                if (data) {
                    let pass = Helper.getCryptedPass(req.body.password, data.salt)
                    if (data.password === pass) {
                        let obj = {
                            id: data.id,
                            email: req.body.email
                        }
                        let token = Helper.getToken(obj);

                        res.status(200).json({
                            token: token,
                            email: req.body.email
                        })
                    } else {
                        res.status(500).json({
                            message: `Incorrect password`
                        })
                    }
                } else {
                    res.status(500).json({
                        message: `Incorrect Email`
                    })
                }
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err.message
                })
            })
    }

    static gsignin(req, res) {
        // res.json(req.body.gtoken)
        client.verifyIdToken({
            idToken: req.body.gtoken,
            audience: process.env.CLIENT_ID
        }, function(err, result) {
            if (err) {
                console.log('error sini')
                res.status(500).json('error from server routes/users.js gsignin')
            } else {
                const payload = result.getPayload(); //udah bisa dapet name sama Email
                const userid = payload['sub'];
                User.findOne({ email: payload.email })
                    .then(function(data) {
                        let obj = {
                            email: payload.email
                        }
                        let token = jwt.sign(obj, process.env.JWT_SECRET);
                        if (data) {
                            res.json({
                                token: token,
                                email: payload.email
                            })
                        } else {
                            // res.json()
                            User.create({
                                    name: payload.name,
                                    email: payload.email,
                                    image: undefined,
                                    password: 'undefined',
                                    oauth: true,
                                    salt: null
                                })
                                .then(() => {
                                    res.status(200).json({
                                        token: token,
                                        email: payload.email
                                    })
                                })
                        }
                    })
                    .catch(function(err) {
                        res.status(500).json(err.message)
                    })
            }
        });
    }

}
module.exports = UserController