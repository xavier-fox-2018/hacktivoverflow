require('dotenv').config()

const hash = require('bycjwt'),
      User = require('../models/user')


module.exports = {

  signUp: (req, res) => {
    console.log('Body-----', req.body)
    let objUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image
    }
    console.log('OBJ USER-----', objUser)
    let user = new User(objUser)
    user.save()
      .then( result => {
        console.log('Masuk');
        console.log('USER------',user);
        
        res.status(201).json({result})
      })
      .catch(err => res.status(500).json({err}))
  },

  signIn: (req, res) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({
      email: email
    })
      .then(user => {
        if (hash.bcdecode(password, user.password)) {
          let user_token = hash.jwtencode({
            _id: user._id,
            name: user.name,
            email: user.email,
            image:user.image
          })
          res.status(200).json({
            name: user.name,
            token: user_token,
            data: hash.jwtdecode(user_token)
          })
        }
        else {
          res.status(400).json({message: "Incrorrect password"})
        }
      })
      .catch(err => {
        res.status(500).json({err})
      })
  },
  
  getCredentials(req, res) {
    console.log('ini token ---->' + req.headers.token);
    
    res.status(200).json({data: hash.jwtdecode(req.headers.token)})
  } 
}