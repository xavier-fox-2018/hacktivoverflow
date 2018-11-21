require('dotenv').config()

const jwt = require('jsonwebtoken'),
      User = require('../models/users'),
      CLIENT_ID = process.env.CLIENT_ID,
      {OAuth2Client} = require('google-auth-library');
      client = new OAuth2Client(CLIENT_ID),
      

module.exports = {
      googleSignUp: (req, res) => {
          console.log('mulai masuk login');
          
          let ticket = new Promise(function(resolve, reject){
              client.verifyIdToken({
                  idToken: req.headers.token,
                  audience: CLIENT_ID
              }, function(err, data) {
                  if(err) {
                      console.log('ini di reject');
                      
                      reject(err)
                  }
                  else {
                      console.log('ini maw resolve');
                      
                      const payload = data.getPayload();
                      const userid = payload['sub'];
                      resolve(userid)
                  }
              });
          })
              .then( userid => {
  
                  axios({
                      method: 'GET',
                      json: true,
                      url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.headers.token}`
                  })
                    .then( body => {
                      console.log('sebelum jwt sigin');
                          
                          jwt.sign({
                              name: body.name,
                              email: body.email
                            }, process.env.SECRET_TOKEN, function(err, token) {
                                if (err) {
                                    console.log('masuk jwt sign in err');
                                    console.log(err);
                                    
                                    
                                  res.status(500).json({
                                      message: err
                                  })
                                }
                                else {
                                    console.log('ini token', token);
                                    
                                  res.status(200).json({
                                      token: token
                                    })
                                }
                            })
                    })
                    .catch(err => {
                      res.status(500).json({
                        message: err
                      })
                    })
              })
              .catch(err => {
                  console.log('masuk catch');
                  
                  console.log(err);
                  
              })
      
      
      }
           
}