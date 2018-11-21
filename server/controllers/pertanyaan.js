
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

const Pertanyaan = require('../models/pertanyaan.js')
const Jawaban = require('../models/jawaban')

module.exports = {
    read: function(req, res){
       Pertanyaan
            .find()
            .populate('user')
            .populate({
                path : 'jawaban',
                populate : {
                    path : 'user'
                }
            })
            .then( data => {

                let pertanyaan = data.map(datum => {
                    datum = datum.toJSON()
                    delete datum.user.password

                    let jawaban_updated = datum.jawaban.map(jawaban =>{
                        delete jawaban.user.password
                        return jawaban
                    })
                    datum.jawaban = jawaban_updated

                    return datum
                })
                res.status(200).json( pertanyaan )
            })
            .catch( error => {
                console.log(error)
                res.status(500).json( { message : error.message})
            })
    },
    findPertanyaan : function( req, res) {
        let pertanyaan_id = req.params.id_pertanyaan

        Pertanyaan
            .findById( pertanyaan_id )
            .populate('user')
            .populate({
                path : 'jawaban',
                populate : {
                    path : 'user'
                }
            })
            .then( pertanyaan =>{
                pertanyaan = pertanyaan.toJSON()
                delete pertanyaan.user.password
                let jawaban_updated = pertanyaan.jawaban.map(jawaban =>{
                    delete jawaban.user.password
                    return jawaban
                })

                pertanyaan.jawaban = jawaban_updated

                res.status(200).json( pertanyaan )
            })
            .catch( error =>{
                res.status(500).json({ message : error.message})
            })
    },
    clearAll : (req, res) => {
        Pertanyaan.deleteMany()
            .then( response => {
                res.status(200).json({ message: 'success'})
            })
            .catch( error => {
                res.status(500).json({ message : error.message})
            })
    },
    create : (req, res) => {
        let title = req.body.title ? req.body.title : false
        let description = req.body.description ?  req.body.description : false
        let user = objectId(req._id)

        if ( !title || !description ){
            res.status(400).json({ message : 'Harap isikan data pertanyaan secara lengkap!'})
        }else{
            let pertanyaan = new Pertanyaan({ title, description, user })

            pertanyaan
                .save()
                .then( response => {
                    res.status(200).json({ message : 'success'})
                })
                .catch(error => {
                    res.status(500).json({ message : error.message})
                })
        }
    },
    updatePertanyaan : (req, res) => {
        let pertanyaan_id = req.params.id_pertanyaan

        let data = req.body

        Pertanyaan
            .findById( pertanyaan_id )
            .then( pertanyaan => {
                pertanyaan.set(data)
                return pertanyaan.save()
            })
            .then( response => {
                res.status(200).json({ message : 'success'})
            })
            .catch( error => {
               
                res.status(500).json({ message : error.message })
            })
    },
    add_jawaban : (req, res) =>{
        let pertanyaan_id = req.params.id_pertanyaan

        let isi = req.body.isi
        let user = objectId(req._id)

        let jawaban = new Jawaban({ isi, user })
        Pertanyaan
            .findById(pertanyaan_id)
            .then( pertanyaan =>{
                pertanyaan.jawaban.push( jawaban._id)
                return Promise.all([pertanyaan.save(), jawaban.save()])
            })
            .then( response => {
                res.status(200).json({ message : 'success'})
            })
            .catch( error => {
                res.status(500).json({ message : error.message})
            })
    }, 
    remove : (req, res) => {
        let id_pertanyaan = req.params.id_pertanyaan

        Pertanyaan
            .findById( id_pertanyaan)
            .then( pertanyaan => {
                return pertanyaan.remove()
            })
            .then( response => {
                res.status(200).json( { message : 'success'} )
            })
            .catch(error => {
                res.status(500).json({ message : error.message})
            })
    } 
}