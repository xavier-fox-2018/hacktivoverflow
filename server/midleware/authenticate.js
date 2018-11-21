const { decoded } = require('../helpers/jasonWebToken')
const User = require('../models/user')
const Article = require('../models/pertanyaan')
const Jawaban = require('../models/jawaban')

const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    isLogin : (req, res, next) => {
        
        let jtoken = req.headers.jtoken
        
        
        if ( jtoken ) {
            let user = decoded(jtoken)
            req._id = user._id
            console.log('Midleware : login valid!')
            next()
        }else {
            res.status(404).json({ massage : 'Belum Login', error : 'sorry, you are not logged in, please log in'})
        }

    },
    isTokenStillValid : (req, res, next) => {

        let _id = req._id

        User
            .findById(_id)
            .then( user => {
                if ( user) {
                    console.log('Midleware :token valid!')
                    next()
                }else {
                    res.status(500).json({ message : 'token tidak valid'})
                }
            })
    },
    isAuthorizeArticle :  (req,res, next) => {
        let user_id = ObjectId(req._id)
        let pertanyaan_id = req.params.id_pertanyaan
       
        Article
            .findById(pertanyaan_id)
            .then( pertanyaan => {
                let pertanyaanOwner = pertanyaan.user
                console.log('owner: ', pertanyaanOwner)
                console.log('user : ', user_id)
                let valid = pertanyaanOwner.equals(user_id)

                if ( valid ) {
                    console.log('Midleware : pertanyaan authorzize valid!')
                    next()
                }else{
                    console.log('pertanyaan not authorize')
                    res.status(500).json({message : 'Tidak memiliki otoritas!'})
                }
            })
            .catch(error => {
                res.status(500).json({ error : error.message})
            })

    },
    isAuthorizeJawaban :  (req,res, next) => {
        let user_id = ObjectId(req._id)
        let jawaban_id = req.params.id_jawaban
       
        Jawaban
            .findById(jawaban_id)
            .then( jawaban => {
                let jawabanOwner = jawaban.user
                let valid = jawabanOwner.equals(user_id)

                if ( valid ) {
                    console.log('Midleware : jawaban authorzize valid!')
                    next()
                }else{
                    console.log('jawaban not authorize')
                    res.status(500).json({message : 'Tidak memiliki otoritas!'})
                }
            })
            .catch(error => {
                res.status(500).json({ error : error.message})
            })

    },
}