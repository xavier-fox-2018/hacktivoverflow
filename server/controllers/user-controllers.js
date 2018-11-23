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
            console.log(`ini`,err);
            
            res.status(500).json({err:err })
        })
    },

    // signup: (req, res) => {
    //     //console.log(req.body);
    //     let objUser = {
    //         name    : req.body.name,
    //         email   : req.body.email,
    //         password: req.body.password
    //     }
    //     User.create(objUser)
    //     .then( response => {
    //         // cron(response.email)
    //         res.status(201).json(response)
    //     })
    //     .catch(err => {
    //         let message = Object.values(err)
    //         console.log( '**********',
    //          message )
    //         // let error = {
    //         //     name : err.erros['name'] ? err.erros['name'].message ? null
    //         // },
            
    //         //console.log( 'mulai :', err)
    //         // console.log( err.message)
    //         res.status(500).json({ message : err.message})
    //     })
    // },

    signup: (req, res) => {
        let name = req.body.name
        let email = req.body.email
        let password = req.body.password
        User.find({email:email})
        .then(user => {
            if(user.length === 0) {
                User.create({name, email, password})
                .then(newUser => {
                    res.status(201).json({
                        err: false,
                        message: `Success to add ${newUser.name}`,
                        data: newUser,
                    })
                })
                .catch(err => {
                    // console.log(`email salah`);
                    res.status(500).json({
                        message: `Please input name & email incorrect`
                    })
                })
            } else {
                // console.log(`email sama`);
                res.status(400).json({message:'Email already registered!'})
            }
        })
        .catch( err => {
            console.log(`salaahh`);
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