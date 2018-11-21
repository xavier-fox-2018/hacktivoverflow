const router = require('express').Router();

const UserController = require('../controllers/user.js');

router.post('/', UserController.create);
router.get('/', UserController.read);
router.put('/', UserController.update);
router.delete('/', UserController.delete);

module.exports = router;