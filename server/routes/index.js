const router = require('express').Router()
const question = require('./question.js')
const answer = require('./answer.js')

const UserController = require('../controllers/userController')

 
router.use('/question', question)
router.use('/answer', answer)

router.post('/register', UserController.register)
router.post('/login', UserController.login)




module.exports = router
