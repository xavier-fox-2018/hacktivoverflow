const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const encryptPassword = require('../helpers/encryptPassword.js');
const {OAuth2Client} = require('google-auth-library');
const axios = require('axios');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
    static register(req, res) {
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        user.save()
            .then(function(user) {
                const response = {
                    success: true,
                    message: `Account ${user.username} registered`
                }
                res.status(201).json(response);
            })
            .catch(function(err) {
                console.log('Register Error: ', err);
                res.status(500).json(err);
            });
    }

    static login(req, res) {
        req.body.password = encryptPassword(req.body.password);

        User.findOne({
            email: req.body.email,
            password: req.body.password
        })
            .then(function(user) {
                if (user) {
                    const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_KEY);
                    res.status(201).json({token: token});
                } else {
                    const err = {
                        message: 'Wrong username or password'
                    };
                    res.status(400).json(err);
                }
            })
            .catch(function(err) {
                console.log('Find User While Login Error: ', err);
                res.status(500).json(err);
            });
    }

    static googleLogin(req, res) {
        const googleToken = req.body.googleToken;
        var ticket = new Promise(function(resolve, reject) {
            client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            }, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    const payload = data.getPayload();
                    const userid = payload['sub'];
                    resolve(userid);
                }
            });
        })
            .then(function(userid) {
                axios({
                    method: 'GET',
                    url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
                })
                    .then(function(userData) {
                        User.findOne({email: userData.data.email})
                            .then(function(user) {
                                if (user) {
                                    const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_KEY);
                                    res.status(201).json({token: token, email: user.email});
                                } else {
                                    let user = new User({
                                        username: userData.data.name,
                                        email: userData.data.email,
                                        password: process.env.OAUTH_PASSWORD,
                                        viaThirdParty: true
                                    })
                                    user.save()
                                        .then(function(user) {
                                            const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_KEY);
                                            res.status(201).json({token: token, email: user.email});
                                        })
                                        .catch(function(err) {
                                            console.log('Skip Register Google Login Error: ', err);
                                            res.status(500).json(err);
                                        });
                                }
                            })
                            .catch(function(err) {
                                console.log('Fine User Google Login Error: ', err);
                                res.status(500).json(err);
                            });
                    })
                    .catch(function(err) {
                        console.log('Get Google User Info Error: ', err);
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                console.log('Ticket Promise Error: ', err);
                res.status(500).json(err);
            });
    }

    static getUserProfile(req, res) {
        User.findById(req.user._id).populate('achievements').select('-password')
            .then(function(user) {
                res.status(200).json(user);
            })
            .catch(function(err) {
                console.log('Find User While Getting Profile Error: ', err);
                res.status(500).json(err);
            });
    }
}

module.exports = UserController;