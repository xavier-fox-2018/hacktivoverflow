const router = require("express").Router()
const isLogin = require("../middleware/isLogin")
const authQuestion = require("../middleware/authQuestion")
const authVoteQuestions = require("../middleware/authVoteQuestions")
const Controller = require("../controllers/questionController")

router
    .get('/', Controller.findAll)
    .get('/detail/:id', Controller.findOne)
    .get('/myquestions/', isLogin, Controller.findMyQuestions)
    .get('/popularQuestions', Controller.popularQuestions)
    .get('/mostAnswer', Controller.mostAnswer)
    .get('/searchQuestion', Controller.searchQuestion)
    .post('/', isLogin, Controller.create)
    .post('/upvote/:id', isLogin, authVoteQuestions, Controller.upvote)
    .post('/downvote/:id', isLogin, authVoteQuestions, Controller.downvote)
    .put('/update/:id', isLogin, authQuestion, Controller.update)
    .delete('/remove/:id', isLogin, authQuestion, Controller.remove)

module.exports = router