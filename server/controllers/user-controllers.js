const User = require('../models/User')
const hash = require('../helpers/hash')
const sgMail = require('@sendgrid/mail')
const cron = require('../helpers/cron')

module.exports = {
    signin: (req, res) => {
        let email = req.body.email
        let password = req.body.password
        User.findOne({email: email})
        .then( user => {
            if(hash.decode(password, user.password)) { 
                res.status(200).json({
                    err: false,
                    name: user.name,
                    token: hash.jwtEncode({
                        id: user._id,
                        name: user.name,
                        email: user.email
                    })
                })
            } else {
                res.status(400).json({message:"Password is wrong"})
            }
        })
        .catch(err => {
            res.status(500).json({err:err })
        })
    },

    signup: (req, res) => {
        console.log(req.body);
        let objUser = {
            name    : req.body.name,
            email   : req.body.email,
            password: req.body.password
        }
        User.create(objUser)
        .then( response => {
            cron(response.email)
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },
    
    getOne: (req, res) => {
        User.findById({_id: req.decoded.id})
        .then( response => {
            let user = {
                name: response.name,
                _id: response._id,
                email: response.email,
                questions: response.questions,
                role: response.role
            }
            res.status(200).json(user)
        })
        .catch( err => {
            res.status(500).json(err)
            console.log(`inii`,err);
            
        })
    },

    allUser: (req, res) =>{
        User.find()
        .then(response =>{
            res.status(200).json(response)
        })
        .catch( err => {
            res.status(500).json(err)
        })
    }
}