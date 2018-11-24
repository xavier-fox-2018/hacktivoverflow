const router = require('express').Router()
const userController = require('../controllers/userController')
const middleware = require('../middleware/middleware')

router.post('/signup',middleware.isUnique,userController.signup)
router.post('/signin',userController.signin)
router.get('/',userController.read)
router.get('/:id',userController.readOne)
router.post('/googlelogin',userController.googleLogin)

router.put('/update',middleware.authenticate,userController.update)

module.exports = router