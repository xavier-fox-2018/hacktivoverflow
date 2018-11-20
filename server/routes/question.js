const router = require('express').Router()
const questionController = require('../controllers/questionController')
const middleware = require('../middleware/middleware')

router.delete('/:id',middleware.authenticate,questionController.delete)
router.post('/create',middleware.authenticate,questionController.create)
router.get('/my',middleware.authenticate,questionController.my)
router.get('/',questionController.read)
router.get('/search',questionController.search)
router.get('/:id',questionController.readOne)
router.put('/:id',middleware.authenticate,questionController.update)

router.get('/bycategory/:id',questionController.byCategory)

module.exports = router