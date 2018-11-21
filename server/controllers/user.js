const User = require('../models/user.js');
const encryptPassword = require('../helpers/encrypt-password.js');

class UserController {

    static create(req, res) {
        User.create({
            name: req.body.email,
            email: req.body.email,
            password: encryptPassword.getEncrypt(req.body.password),
        })
            .then(function(resolve) {
                res.status(201).json(resolve);
            })
            .catch(function(reject) {
                res.status(500).json(reject);
            });
    }

    static read(req, res) {

    }

    static update(req, res) {

    }

    static delete(req, res) {

    }

}

module.exports = UserController;