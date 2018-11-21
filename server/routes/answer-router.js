const express = require('express');
const router = express.Router();
const {isLogin} = require('../middlewares/isLogin')
const {addAnswer,getAllAnswer} = require('../controllers/answer-controller')

router.post('/', addAnswer)
router.get('/', getAllAnswer)
// router.get('/one', isLogin, getOne)

module.exports = router;

