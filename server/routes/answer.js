const router = require('express').Router()
const answerController = require('../controllers/answerController.js')
const isAuthenticated = require('../middlewares/isAuthenticated')

 
router.post('/:questionID', isAuthenticated, answerController.create)
router.get('/:questionID', answerController.readAll)
router.put('/:answerID', isAuthenticated, answerController.update)
// router.delete('/:questionID', isAuthenticated, answerController.delete)


module.exports = router