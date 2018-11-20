const router = require('express').Router()
const middleware = require('../middleware/middleware')

const upvoteController = require('../controllers/upvoteController')
const downvoteController = require('../controllers/downvoteController')

router.post('/upvotequestion/:id',middleware.authenticate,upvoteController.createQ)
router.post('/downvotequestion/:id',middleware.authenticate,downvoteController.createQ)

router.post('/upvoteanswer/:id',middleware.authenticate,upvoteController.createA)
router.post('/downvoteanswer/:id',middleware.authenticate,downvoteController.createA)

module.exports = router;