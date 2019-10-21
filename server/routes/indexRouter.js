const indexRouter = require('express').Router();
const UserController = require('../controllers/userController.js');

indexRouter.get('/', function(req, res) {
    res.send('Welcome to Hacktiv X Overflow!');
});

indexRouter.post('/register', UserController.register);
indexRouter.post('/login', UserController.login);
indexRouter.post('/googlelogin', UserController.googleLogin);

module.exports = indexRouter;