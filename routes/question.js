const router = require('express').Router()
const Controller = require('../controllers/question.js')
const isExist = require('../middleware/isExist.js')
const isAuthorized = require('../middleware/isAuthorized.js')
const isQuestionExist = require('../middleware/isQuestionExist.js')

router.get('/', Controller.viewQuestions)
router.post('/add', isExist, isAuthorized, Controller.addQuestion)
router.delete('/delete', isExist, isAuthorized, Controller.deleteQuestion)
router.put('/edit', isExist, isAuthorized, Controller.editQuestion)
router.post('/vote', isExist, isQuestionExist, Controller.vote)

module.exports = router 