const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {

    static create (req, res) {
        User
            .create({
              name : req.body.name,
              email: req.body.email,
              password: req.body.password
            })
            .then(data => {
              res.status(201).json({
                message : "user created"
              })
            })
            .catch(err => {
              console.log(err)
              res.status(400).json(err)
            })
    }

    static login (req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .then(function(user) {
                if (user) {
                    const result = bcryptjs.compareSync(req.body.password, user.password);
                    if (result) {
                        const token = jwt.sign({id: user._id, name: user.name, email: user.email},
                        process.env.JWT_TOKEN);
                        res.status(201).json({token: token, name:user.name});
                    } else {
                        const err = {
                            message: 'Wrong username or password'
                        };
                        res.status(400).json(err);
                    }
                } else {
                    const err = {
                        message: 'Wrong username or password'
                    };
                    res.status(400).json(err);
                }
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
  }
}

module.exports = UserController