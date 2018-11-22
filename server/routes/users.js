var express = require('express');
var route = express.Router();
const UserController = require('../controllers/users')

route.post('/signup', UserController.signup)
route.post('/signin', UserController.signin)
route.post('/oauthsignin', UserController.oAuthSignin)
route.get('/:id', UserController.getUserDetail)

module.exports = route
