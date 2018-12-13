const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const axios =require("axios")
const {OAuth2Client} = require('google-auth-library');


module.exports = {
  getAll: function(req,res) {
    User.find({})
    .then((users) => {
      res.status(200).json({
        users,
        message: `Users data has been found`
      })
    })
    .catch((err) => {
      res.status(400).json({
        err,
        message: `Cannot get users data`
      })
    })
  },

  signup: function (req,res) {
    let dataUser = new User({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    })
    dataUser.save()
      .then((user) => {
        res.status(201).json({
          user,
          message: `signup success`
        })
      })
      .catch((err) => {
        res.status(404).json({
          err,
          message: `signup failed`
        })
      }); 
  },

  signin: function (req,res) {
    User.findOne(
      {email : req.body.email}
    )
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          jwt.sign(
            { userId: user._id,
              statusDel: user.statusDelete },
            process.env.ACCESS_TOKEN,
            function(err, token) {
              if (!err) {
                res.status(201).json({
                  name: user.name,
                  email: user.email,
                  token: token
                });
              } else {
                res.status(500).json({
                  message: `Email and password didn't match`
                });
              }
            }
          );
        } else { 
          res.status(500).json({
            message: "email and password didnt match"
          });
        }
      } else {
        res.status(500).json({
          message: "email and password didnt match"
        });
      }
    }).catch((err) => {
      res.status(404).json({
        err,
        message: `email and password didn't match`
      })  
    });
  },

  signinGoogle: function (req,res) {
    let token = req.headers.tokengoogle
    let CLIENT_ID = "894640404387-rmm4d8ceoj9f7f7sh1i4c7ki86rfd2v7.apps.googleusercontent.com"
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      let dataRespon = null
      axios({
        method:'GET',
        url:`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
      })
      .then((response) => {
        dataRespon = response
        return User.findOne(
          { email: response.data.email});
      })
      .then((user) => {
        if(user !== null){
          let mypassword = dataRespon.data.family_name + process.env.GOOGLE_HASH_PASSWORD
          if (bcrypt.compareSync(mypassword, user.password)) {
            jwt.sign(
              { userId: user._id,
                statusDel: user.statusDelete },
              process.env.ACCESS_TOKEN,
              function(err, token) {
                if (!err) {
                  res.status(201).json({
                    name: user.name,
                    email: user.email,
                    token: token
                  });
                }
              }
            );
          }
        } else {
          let dataUser = new User({
            name: dataRespon.data.name,
            phone: dataRespon.data.iat,
            email: dataRespon.data.email,
            password: dataRespon.data.family_name + process.env.GOOGLE_HASH_PASSWORD,
          })      
          dataUser.save()
          .then((response) => {
            jwt.sign(
              { userId: response._id,
                statusDel: response.statusDelete },
              process.env.ACCESS_TOKEN,
              function(err, token) {
                if (!err) {
                  res.status(201).json({
                    name: response.name,
                    email: response.email,
                    token: token
                  });
                }
              }
            );
          }).catch((err) => {
            res.status(500).json({
              err,
              message: `login with google failed`
            })
          });
        }
      })
      .catch((err) => {
      });
    }
    verify().catch(console.error);
  },

  update: function (req,res) {
    User.update(
      {_id: req.userId}, 
      { name: req.body.name})
      .then((user) => {
        res.status(201).json({
          user,
          message: `update success`
        })
      })
      .catch((err) => {
        res.status(404).json({
          err,
          message: `update failed`
        })
      })
  },

  remove: function (req, res) {
    User.deleteOne({_id: req.userId})
    .then((user) => {
      res.status(200).json({
        user,
        message: `User has been deleted`
      })
    })
    .catch((err) => {
      res.status(400).json({
        err,
        message: `Deleting user failed`
      })
    })
  }
}