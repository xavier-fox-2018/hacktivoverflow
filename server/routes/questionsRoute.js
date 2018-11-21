const   express = require('express'),
        router = express.Router(),
        QuestionController = require('../controllers/question_controller.js'),
        authorizaiton = require('../middlewares/authorization'),
        authentication = require('../middlewares/authentication');

router.post('/', authentication, QuestionController.create );
router.put('/', authentication,  QuestionController.update );
router.get('/all', QuestionController.readAll );
router.get('/detail', QuestionController.readDetailQuestions );
router.get('/', authentication, QuestionController.readOwnQuestions );
router.delete('/', authentication, QuestionController.delete );
router.patch('/upvote', authentication, QuestionController.upvote );
router.patch('/downvote', authentication, QuestionController.downvote );

module.exports = router;
