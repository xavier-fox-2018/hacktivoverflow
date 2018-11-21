const express = require('express'),
      router = express.Router(),
      Controller = require('../controllers/question'),
      { authenticate, authorize } = require('../middlewares/auth')


router
    .post('/add', authenticate, authorize, Controller.create)
    .get('/all', Controller.showAllQuestion)
    .get('/mine', authenticate, authorize, Controller.showAllUserQuestion)
    .get('/search', Controller.search)
    .get('/:id', authenticate, authorize, Controller.getQuestion)
    .put('/update/:id', authenticate, authorize, Controller.update)

module.exports = router