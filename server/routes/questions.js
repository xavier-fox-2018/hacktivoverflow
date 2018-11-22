var express = require('express');
var router = express.Router();

const QuestionController = require('../controllers/QuestionController')

router.post('/', QuestionController.create)
router.get('/', QuestionController.index)

module.exports = router