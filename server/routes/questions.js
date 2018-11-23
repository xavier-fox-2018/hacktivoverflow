var express = require('express');
var router = express.Router();
const isOwner = require('../middlewares/isOwner')
const isLogin = require('../middlewares/isLogin')

const QuestionController = require('../controllers/QuestionController')

router.post('/', QuestionController.create)
router.get('/', QuestionController.index)
router.patch('/:id/upVote', isLogin, isOwner.voteQuestion, QuestionController.upvote)

module.exports = router