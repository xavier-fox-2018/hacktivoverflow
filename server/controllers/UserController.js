const User = require('../models/User')
const jwtHelper = require('../helpers/jwtHelper')
const bcryptHelper = require('../helpers/bcryptHelper')
const Tag = require('../models/Tag')

class UserController {
    static register(req,res){
        User.findOne({
            email: req.body.email
        })
            .then(user=>{
                if(user){
                    res.status(400).json({
                        message: 'Email is already exists, please pick another'
                    })
                } else {
                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    })
                        .then(response=>{
                            res.status(201).json({
                                user: response,
                                message: 'User is succesfully registered!'
                            })
                        })
                        .catch(error=>{
                            if(error.errors.email || error.errors.password){
                                res.status(400).json({
                                    message: 'Invalid input'
                                })
                            } else {
                                res.status(500).json(error)
                            }
                        })
                }
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            }) 
    }

    static login(req,res){
        
        User.findOne({
            email: req.body.email
        })
            .then(user=>{
                if(user){
                    if(bcryptHelper.decode(req.body.password, user.password)){
                        let data = {
                            id : user._id,
                            role: user._role,
                            name: user.name
                        }
                        let token = jwtHelper.encode(data)
                        res.status(200).json({
                            name: user.name,
                            token: token
                        })
                    } else {
                        res.status(400).json({
                            message: 'Email and password missmatch'
                        })
                    }
                } else {
                    res.status(400).json({
                        message: 'Email doesn\'t match with our records'
                    })
                }
            })
            .catch(err=>{
                res.status(500).json({
                    message: "Internal Server error",
                    error: err.message
                })
            })
        
    }

    static index(req,res){
        User.find()
            .populate('questions')
            .populate('answers')
            .populate('interests')
            .then(users=>{
                res.status(200).json(users)
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            })
    }
}

module.exports = UserController