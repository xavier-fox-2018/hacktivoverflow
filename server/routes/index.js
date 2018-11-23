const express = require('express');
const router = express.Router();
const user = require('./users-router')
const question = require('./question-router')
const answer = require('./answer-router')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Khairul Baharuddin');
});
router.use('/answer', answer)
router.use('/users', user)
router.use('/questions', question)

module.exports = router;
