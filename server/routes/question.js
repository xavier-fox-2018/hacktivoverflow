const router = require('express').Router()
const questionController = require('../controllers/questionController.js')
const isAuthenticated = require('../middlewares/isAuthenticated')

 
router.post('/', isAuthenticated, questionController.create)
router.get('/', questionController.readAll)
router.put('/:questionID', isAuthenticated, questionController.update)
router.delete('/:questionID', isAuthenticated, questionController.delete)
router.patch('/upvote/:questionID', isAuthenticated, questionController.upvote)
router.patch('/downvote/:questionID', isAuthenticated, questionController.downvote)



module.exports = router


