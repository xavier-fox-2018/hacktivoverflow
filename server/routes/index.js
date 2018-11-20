const express = require('express')
const Router = express.Router()

const {isLogin, ownQuestion} = require('../middlewares/middleware')

const UserController = require('../controllers/UserController')
const QuestionController = require('../controllers/QuestionController')
const CommentController = require('../controllers/CommentController')

Router.post('/register', UserController.register)
Router.post('/login', UserController.login)

Router.post('/questions',isLogin, QuestionController.create)
Router.get('/questions',isLogin, QuestionController.getAll)
Router.delete('/questions/:id', isLogin, ownQuestion, QuestionController.delete)
Router.put('/questions/:id', isLogin, ownQuestion, QuestionController.update)

Router.get('/comments',isLogin, CommentController.getAll)
Router.post('/comments/:questionId',isLogin, CommentController.create)

module.exports = Router