const helpers = require('../helpers')
const ModelUser = require('../models/user')
const jwt = require('jsonwebtoken')

class Auth {
    static login(req, res){
        let email = req.body.email
        let password = helpers.auth(req.body.password)
        console.log(email , req.body.password);
        ModelUser.findOne({
            email : email,
            password : password
        })
         .then(data=>{
            if (data === null) {
                console.log('null')
                res.status(500).json({
                    message : 'Invalid Username or password'
                })  
            } else {
                console.log(data.username);
                let token = jwt.sign(data.username, 'secret')
                res.status(200).json({
                    message : 'Login Successfully',
                    token : token
                })
            }
         })
         .catch(err=>{
            res.status(500).json({
                message : 'Login Failed 000'
            })
         })
    }

    static register(req, res){
        ModelUser.findOne({
            email : req.body.email
        })
         .then(data=>{
             if (data === 
                
                
                null) {
                 ModelUser.create({
                    username : req.body.username,
                    email : req.body.email,
                    password : helpers.auth(req.body.password)
                 })
                  .then(data=>{
                    console.log(data)
                    let token = jwt.sign({email : data.email, id:data._id},  'secret')
                    res.status(201).json({
                        data : data,
                        message : 'New User has been created',
                        token : token
                    })
                  })
                  .catch(err=>{
                      res.status(500).json({
                          message : err.message
                      })
                  })
             } else {
                res.status(500).json({
                    data : data,
                    message : 'email has already exist'
                })
             }
         })
         .catch(err=>{
             res.status(500).json({
                 message : 'Please check your input'
             })
         })
    }
}

module.exports = Auth