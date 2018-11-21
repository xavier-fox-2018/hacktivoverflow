const User = require('../models/users')
const { encrypt } = require('../helpers')
const jwt  = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios')

class Controller {
    static signup(req,res){
        encrypt(req.body.password)
        .then(function(encryptedPassword) {
            let newUser = new User({
                name:  req.body.name,
                email:   req.body.email,
                password: encryptedPassword,
                avatar : 'http://placehold.it/50x50',
                age : null,
                bio : null,
                isadmin : false
            })
            return newUser
        })
        .then(function(newUser) {
            newUser.save()
            res.status(201).json({
                message : 'signup success',
                user : newUser
            })
        })
        .catch(function(err){
           console.log(err)
           res.status(500).json({
               message : 'failed to create user',
               err : err
           })
        })
    }

    static signin(req,res){
        User.findOne({
            email : req.body.email
        })
        .then(function(dataUser){
            let decrypt = bcrypt.compareSync(req.body.password, dataUser.password); // true
            if(decrypt == true){
                let token = jwt.sign({
                    userId : dataUser._id,
                    name : dataUser.name,
                    email : dataUser.email
                }, process.env.SECRET_KEY)

                res.status(200).json({
                    userId : dataUser._id,
                    name : dataUser.name,
                    email : dataUser.email,
                    token : token
                })
            }else{
                res.status(500).json({
                    message : 'Invalid password'
                })
            }
        })
        .catch(function(){
            res.status(500).json({
                message : `Invalid username`
            })
        })
    }

    static read(req,res){
        User.find()
            .then(function (allUser) {
                res.status(200).json({
                    allUser
                })
            })
            .catch(function (err) {
                res.status(500).json({
                    err
                })
            })
    }

    static readOne(req,res){
        User.findById(req.params.id)
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'failed to find user',
                err : err
            })
        })
    }

    static update(req,res){
        User.findOneAndUpdate({
            _id : req.userData._id
        }, {
            name : req.body.name,
            email : req.body.email,
            age : req.body.age,
            avatar : req.body.avatar,
            bio : req.body.bio
        })
        .then(function (task) {
            res.status(200).json({
                message: `update completed...`
            })
        })
        .catch(function (err) {
            res.status(500).json({
                message : 'update failed'
            })
        })
    }

    static googleLogin(req,res){
        
        let googleToken = req.body.googleToken;
        
        var ticket = new Promise((resolve, reject) => {
            client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const payload = data.getPayload();

                    const userId = payload['sub'];
                    resolve(userId);
                }
            })
        }).then((userId) => {
            axios({
                method: 'GET',
                url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
            })
            .then((result) => {
                
                User.findOne({
                    email: result.data.email
                })
                .then((dataUser) => {
                   
                    if (dataUser) {
                        let token = jwt.sign({
                            userId : dataUser._id,
                            name : dataUser.name,
                            email : dataUser.email
                        }, process.env.SECRET_KEY)
        
                        res.status(200).json({
                            userId : dataUser._id,
                            name : dataUser.name,
                            email : dataUser.email,
                            token : token
                        })
                        
                    } else {
                        User.create({
                            name:  result.data.name,
                            email:   result.data.email,
                            password: null,
                            avatar : 'http://placehold.it/50x50',
                            oauth : true
                        })
                        .then((dataUser)=>{
                            let token = jwt.sign({
                                userId : dataUser._id,
                                name : dataUser.name,
                                email : dataUser.email
                            }, process.env.SECRET_KEY)
            
                            res.status(200).json({
                                userId : dataUser._id,
                                name : dataUser.name,
                                email : dataUser.email,
                                token : token
                            })
                        })
                        .catch((error)=>{
                            res.status(500).json({
                                message : 'Create User Error'
                            })
                        })
                    }
                }).catch((err) => {
                    res.status(500).json(err);
                });

            }).catch((err) => {
                res.status(500).json(err);
            });

        }).catch((err) => {
            res.status(500).json(err);
        });
    }
}

module.exports = Controller;