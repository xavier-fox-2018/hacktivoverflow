const route = require('express').Router()
const AnswerController = require('../controllers/answers')
const authentication = require('../middlewares/authentication')
const voteAuthentication = require('../middlewares/voteAnswerAuthorization')

route.get('/:id', authentication, AnswerController.getOneAnswer)
route.post('/:id', authentication, AnswerController.postAnswer)
route.put('/:id', authentication, AnswerController.updateAnswer)
route.post('/vote/:id', authentication, voteAuthentication, AnswerController.vote)

module.exports = route
