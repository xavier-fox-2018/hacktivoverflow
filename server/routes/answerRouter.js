const answerRouter = require('express').Router();
const AnswerController = require('../controllers/answerController.js');
const isLogin = require('../middlewares/isLogin.js');
const isAuthorizedCommenter = require('../middlewares/isAuthorizedCommenter.js');

answerRouter.get('/:question_id', isLogin, AnswerController.showAll);
answerRouter.post('/:question_id', isLogin, AnswerController.add);
answerRouter.put('/:question_id', isLogin, isAuthorizedCommenter, AnswerController.update);
answerRouter.patch('/upvote/:question_id', isLogin, AnswerController.upvote);
answerRouter.patch('/downvote/:question_id', isLogin, AnswerController.downvote);

module.exports = answerRouter;