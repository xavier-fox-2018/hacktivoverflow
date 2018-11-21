var express = require('express');
var router = express.Router();
var Middleware = require('../middlewares/index.js');
var Answers = require('../controllers/answers.js');

router.post('/', Middleware.isLogin, Answers.createAnswer);
router.get('/', Middleware.isLogin, Answers.getAnswersUser);
router.get('/:question_id', Middleware.isLogin, Answers.getAnswers);
router.delete('/:id', Middleware.isLogin, Middleware.isAnswerOwner, Answers.deleteAnswer);
router.put('/:id', Middleware.isLogin, Middleware.isAnswerOwner, Answers.updateAnswer)
    // router.post('/uploadImage', upload.single('file'), Answers.uploadImage)
router.get('/one/:id', Middleware.isLogin, Answers.getOneAnswer)
router.post('/upvote', Middleware.isLogin, Middleware.isNotAnswerOwner, Answers.upvote);
router.post('/downvote', Middleware.isLogin, Middleware.isNotAnswerOwner, Answers.downvote);
module.exports = router;