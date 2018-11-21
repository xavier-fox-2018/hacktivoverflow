const router = require('express').Router();

const QuestionController = require('../controllers/question.js');

router.post('/', QuestionController.create);
router.get('/', QuestionController.read);
router.put('/:QuestionId', QuestionController.update);
router.delete('/:QuestionId', QuestionController.delete);

router.get('/:QuestionId', QuestionController.getOne);

module.exports = router;