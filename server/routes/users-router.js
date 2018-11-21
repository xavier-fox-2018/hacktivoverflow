const express = require('express');
const router = express.Router();
const {isLogin} = require('../middlewares/isLogin')
const {signin, signup, getOne} = require('../controllers/user-controllers')

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/one', isLogin, getOne)

module.exports = router;

