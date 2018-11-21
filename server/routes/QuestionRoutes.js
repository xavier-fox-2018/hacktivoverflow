const express = require('express')
const router = express.Router()
const QuestionController = require('../controllers/QuestionsController.js')


router.get('/', QuestionController.all)

router.post('/add', QuestionController.add)

router.patch('/:id/answer', QuestionController.answer)

router.delete('/:id/delete', QuestionController.deleteAnswer)

router.get('/:id', QuestionController.getOne)

module.exports = router 