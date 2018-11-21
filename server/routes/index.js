var express = require('express');
var router = express.Router();
const usersRouter = require('./users')
const questionsRouter = require('./questions')
const answersRouter = require('./answers')



router.use('/users', usersRouter)
router.use('/questions', questionsRouter)
router.use('/answers', answersRouter)

module.exports = router;
