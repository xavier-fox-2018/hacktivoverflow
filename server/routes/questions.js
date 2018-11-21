const express = require('express');
const router = express.Router();
const {QuestionController} = require('../controllers')
const {isLogin} = require('../middlewares')


router.get('/', QuestionController.getAllQuestion)
router.get('/myQuestions', isLogin, QuestionController.getOwnQuestion)
router.get('/:id', QuestionController.getOneQuestion)
router.post('/', isLogin, QuestionController.createNewQuestion)
router.delete('/:id', isLogin, QuestionController.deleteQuestion)
router.put('/:id', isLogin, QuestionController.updateQuestion)
router.patch('/upvote/:idQuestion', isLogin, QuestionController.upvoteQuestion)
router.patch('/downvote/:idQuestion', isLogin, QuestionController.downvoteQuestion)

module.exports = router