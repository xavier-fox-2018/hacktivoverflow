const router = require('express').Router()
const answerController = require('../controllers/answerController')
const middleware = require('../middleware/middleware')

router.post('/:id',middleware.authenticate,answerController.create)
router.get('/',answerController.read)
router.delete('/:id',middleware.authenticate,answerController.delete)

// router.get('/',answerController.read)
// router.get('/:id',answerController.readOne)

module.exports = router;