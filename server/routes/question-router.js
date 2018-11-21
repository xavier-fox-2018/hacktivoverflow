const express = require('express');
const router = express.Router();
const {isLogin} = require('../middlewares/isLogin')
const {addQuestion, getAll, myQuestion, deleteById, getOne, putById, likers, unlikers} = require('../controllers/question-controller')

router.post('/', isLogin, addQuestion)
router.get('/', getAll)
router.get('/myQuestion', isLogin, myQuestion)
router.delete('/:id', isLogin, deleteById)
router.get('/:id', isLogin, getOne)
router.put('/:id', isLogin, putById)
router.put('/like/:id', isLogin, likers)
router.put('/unlike/:id', isLogin, unlikers)



module.exports = router;

