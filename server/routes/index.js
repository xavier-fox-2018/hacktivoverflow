const router = require('express').Router();

const userRoute = require('./user.js');
const questionRoute = require('./question.js');

router.use('/users', userRoute);
router.use('/questions', questionRoute);

module.exports = router;