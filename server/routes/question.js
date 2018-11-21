var express = require('express');
var router = express.Router();
const questionController = require('../controller/questionController')
// const multer = require('../middlewares/multer')
const isLogin = require('../middlewares/isLogin')


router.post('/add',questionController.add)
router.delete('/', questionController.delete)
router.put('/update', questionController.update)
router.get('/', questionController.readData)
router.post('/user',isLogin, questionController.readUser)
// router.post('/detail', questionController.detailQuestion)


router.post('/upvote',isLogin, questionController.upvote)
router.post('/downvote',isLogin, questionController.downvote)



module.exports = router