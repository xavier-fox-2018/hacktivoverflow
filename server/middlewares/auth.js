require('dotenv').config()

const User = require('../models/user'),
  jwt = require('jsonwebtoken'),
  // // axios = require('axios'),
  // CLIENT_ID = process.env.CLIENT_ID,
  // {OAuth2Client} = require('google-auth-library'),
  // client = new OAuth2Client(CLIENT_ID),
  hash = require('bycjwt')

module.exports = {
  authenticate: function(req, res, next) {
    const validUser = hash.jwtdecode(req.headers.token)
    console.log('masuk auth');
    
    if (req.headers.token === undefined || validUser === undefined) {
      console.log('auth nya error');
      
      res.status(404).json({message: 'Token not valid'})
    }
    else {
      console.log('Masuk auth yg sukses');
      
      req.data = validUser
      next()
    }
    
  },

  authorize: function(req, res, next) {
    User.findOne({
      _id: req.data._id
    })
      .then(() => next())
      .catch(err => res.status(403).json({message: 'Permission to access site is denied' + err}))
  }

  // googleAuth (req,res,next) {
  //   let googleToken = req.body.googleToken
  //   console.log('masuk middleware/googleAuth', googleToken)
  //   let ticket = new Promise(function(resolve, reject) {
  //     client.verifyIdToken({
  //       idToken: googleToken,
  //       audience: CLIENT_ID
  //     }, function(err, data) {
  //       if (!err) {
  //         let payload = data.getPayload()
  //         let userid = payload['sub']
  //         resolve(userid)
  //       } else {
  //         reject(err)
  //       }
  //     })
  //   })
  //   .then (userid => {

  //     axios({
  //       method: 'GET',
  //       url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
  //     })
  //     .then(result => {
  //       req.body.name = result.data.name
  //       req.body.email = result.data.email
  //       next()
  //     })
  //     .catch(err => {
  //       res.status(500).json({
  //         message: `access denied`
  //       })
  //     })
  //   }) 
	// }
}
