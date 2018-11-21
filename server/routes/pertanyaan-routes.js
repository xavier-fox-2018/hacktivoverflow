const Router = require('express').Router()

const { isLogin, isTokenStillValid, isAuthorizeArticle } = require('../midleware/authenticate')

const { read , findPertanyaan, clearAll, create , updatePertanyaan, add_jawaban, remove} = require('../controllers/pertanyaan')

Router.get('/', read)
Router.get('/:id_pertanyaan',isLogin,isTokenStillValid, findPertanyaan)
Router.post('/',isLogin,isTokenStillValid,create)
Router.put('/:id_pertanyaan', isLogin,isTokenStillValid, isAuthorizeArticle, updatePertanyaan)
Router.put('/add-jawaban/:id_pertanyaan',isLogin,isTokenStillValid,add_jawaban)
Router.delete('/:id_pertanyaan',isLogin,isTokenStillValid, isAuthorizeArticle,remove)

module.exports = Router