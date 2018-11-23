const express = require('express')
const Router = express.Router()

const {isLogin, ownQuestion} = require('../middlewares/middleware')

const UserController = require('../controllers/UserController')
const QuestionController = require('../controllers/QuestionController')
const CommentController = require('../controllers/CommentController')
const CronController  = require('../controllers/CronController')

Router.post('/register', UserController.register)
Router.post('/login', UserController.login)

Router.post('/questions',isLogin, QuestionController.create)
Router.get('/questions', QuestionController.getAll)
Router.get('/myquestions', isLogin, QuestionController.getMy)
Router.get('/questions/:id',  QuestionController.getOne)
Router.delete('/questions/:id', isLogin, ownQuestion, QuestionController.delete)
Router.put('/questions/:id', isLogin, ownQuestion, QuestionController.update)

Router.patch('/voteanswer/:id', isLogin, CommentController.voteanswer)
Router.patch('/downvoteanswer/:id', isLogin, CommentController.downvoteanswer)


Router.patch('/votequestion/:id', isLogin, QuestionController.vote)
Router.patch('/downvotequestion/:id', isLogin, QuestionController.downvote)

Router.get('/comments/:questionId',isLogin, CommentController.getAll)
Router.post('/comments/:questionId',isLogin, CommentController.create)

Router.get('/test', CronController.sendMail)

module.exports = Router