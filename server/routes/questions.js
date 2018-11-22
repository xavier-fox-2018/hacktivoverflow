const route = require('express').Router()
const QuestionController = require('../controllers/questions')
const authentication = require('../middlewares/authentication')
const voteAuthorization = require('../middlewares/voteQuestionAuthorization')

route.get('/', QuestionController.getQuestion)
route.get('/:id', QuestionController.getOneQuestion)
route.post('/', authentication, QuestionController.postQuestion)
route.put('/:id', authentication, QuestionController.updateQuestion)
route.delete('/:id', authentication, QuestionController.deleteQuestion)
route.post('/vote/:id', authentication, voteAuthorization, QuestionController.vote)

module.exports = route
