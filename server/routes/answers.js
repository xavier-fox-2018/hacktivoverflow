const express = require('express');
const router = express.Router();
const {AnswerController} = require('../controllers')
const {isLogin} = require('../middlewares')

router.get('/', AnswerController.getAll)
router.get('/myAnswers', isLogin, AnswerController.getOwnAnswer)
router.get('/:idQuestion', AnswerController.getByQuestion)
router.post('/:idQuestion', isLogin, AnswerController.newAnswer)
router.put('/:idAnswer', isLogin, AnswerController.editAnswer)
router.patch('/upvote/:idAnswer', isLogin, AnswerController.upvoteAnswer)
router.patch('/downvote/:idAnswer', isLogin, AnswerController.downvoteAnswer)
module.exports = router