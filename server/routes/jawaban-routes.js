const Router = require('express').Router()

const { isLogin, isTokenStillValid, isAuthorizeJawaban } = require('../midleware/authenticate')

const {  findJawaban, deleteJawaban , updateJawaban } = require('../controllers/jawaban')

Router.get('/:id_jawaban',isLogin,isTokenStillValid, findJawaban)
Router.delete('/:id_pertanyaan/:id_jawaban',isLogin,isTokenStillValid,isAuthorizeJawaban, deleteJawaban)
Router.put('/:id_jawaban', isLogin,isTokenStillValid, isAuthorizeJawaban, updateJawaban)

module.exports = Router