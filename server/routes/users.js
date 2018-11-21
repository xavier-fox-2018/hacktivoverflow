var express = require('express');
var router = express.Router();

var User = require('../controllers/users.js')

router.post('/gsignin', User.gsignin)
router.post('/signup', User.signup);
router.post('/signin', User.signin)
module.exports = router;