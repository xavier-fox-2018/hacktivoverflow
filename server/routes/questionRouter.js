const questionRouter = require('express').Router();
const QuestionController = require('../controllers/questionController.js');
const isLogin = require('../middlewares/isLogin.js');
const isAuthorizedPoster = require('../middlewares/isAuthorizedPoster.js');

questionRouter.post('/addAchievement', QuestionController.addAchievement);

questionRouter.get('/ownquestions/user', isLogin, QuestionController.findByPoster);
questionRouter.get('/search/:keyword', QuestionController.searchQuestion);
questionRouter.get('/:id', QuestionController.findWithId);
questionRouter.get('/', QuestionController.showAll);
questionRouter.post('/', isLogin, QuestionController.create);
questionRouter.delete('/:id', isLogin, isAuthorizedPoster, QuestionController.delete);
questionRouter.put('/:id', isLogin, isAuthorizedPoster, QuestionController.update);
questionRouter.patch('/upvote/:id', isLogin, QuestionController.upvote);
questionRouter.patch('/downvote/:id', isLogin, QuestionController.downvote);
questionRouter.patch('/addCount/:id', isLogin, QuestionController.incrementCount);

module.exports = questionRouter;