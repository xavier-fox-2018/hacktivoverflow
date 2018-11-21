var express = require('express');
var router = express.Router();
const Controller = require('../controller/answerController')
const isLogin = require('../middlewares/isLogin')

router.post('/add',isLogin, Controller.add)
router.delete('/delete', Controller.delete)
router.post('/read',Controller.readAnswer)
router.get('/all', Controller.allAnswer)
router.post('/upvote', isLogin, Controller.upvote)
router.post('/downvote', isLogin, Controller.downvote)

module.exports = router