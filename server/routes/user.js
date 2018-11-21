const router = require('express').Router(),
      { signIn, signUp, getCredentials } = require('../controllers/user')


router
    .post('/register', signUp)
    .post('/login', signIn)
    .get('/data', getCredentials)




module.exports = router