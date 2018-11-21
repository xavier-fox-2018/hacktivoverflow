var express = require('express');
var router = express.Router();
var Question = require('../controllers/questions.js');
var Middleware = require('../middlewares/index.js');

router.post('/', Middleware.isLogin, Question.createQuestion);

router.get('/', Middleware.isLogin, Question.getAllQuestions);
router.get('/mine', Middleware.isLogin, Question.getMyQuestions);
router.get('/:id', Middleware.isLogin, Question.getOneQuestion)
router.delete('/:id', Middleware.isLogin, Middleware.isQuestionOwner, Question.deleteQuestion);
router.put('/:id', Middleware.isLogin, Middleware.isQuestionOwner, Question.updateQuestion);


router.post('/upvote', Middleware.isLogin, Middleware.isNotQuestionOwner, Question.upvote);
router.post('/downvote', Middleware.isLogin, Middleware.isNotQuestionOwner, Question.downvote);
module.exports = router;