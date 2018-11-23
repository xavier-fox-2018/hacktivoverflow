var express = require('express');
var router = express.Router();
const isOwner = require('../middlewares/isOwner')
const isLogin = require('../middlewares/isLogin')

const QuestionController = require('../controllers/QuestionController')

router.post('/', QuestionController.create)
router.get('/', QuestionController.index)
router.patch('/:id/upvote', isLogin, isOwner.voteQuestion, QuestionController.upvote)
router.patch('/:id/downvote', isLogin, isOwner.voteQuestion, QuestionController.downvote)

module.exports = router