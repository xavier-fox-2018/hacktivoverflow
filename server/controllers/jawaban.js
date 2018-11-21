const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

const Pertanyaan = require('../models/pertanyaan')
const Jawaban = require('../models/jawaban')

module.exports = {
    updateJawaban : (req, res) => {
        let jawabanId = req.params.id_jawaban

        let data = req.body

        Jawaban
            .findById( jawabanId )
            .then( jawaban => {
                jawaban.set(data)
                return jawaban.save()
            })
            .then( response => {
                res.status(200).json({ message : 'success'})
            })
            .catch( error => {
                res.status(500).json({ message : error.message })
            })
    },
    findJawaban : function( req, res) {
        let jawaban_id = req.params.id_jawaban

        Jawaban
            .findById( jawaban_id )
            .populate('user')
            .then( jawaban => {
                jawaban = jawaban.toJSON()
                delete jawaban.user.password
                res.status(200).json( jawaban )
            })
            .catch( error => {
                res.status(500).json({ message : error.message })
            })
    },
    deleteJawaban : (req, res) => {
        let pertanyaan_id = ObjectId(req.params.id_pertanyaan)
        let jawaban_id = ObjectId(req.params.id_jawaban)

        let articelHasJawaban = null

        Pertanyaan
            .findById( pertanyaan_id )
            .then( pertanyaan => {
                
                let jawabanSelected = pertanyaan.jawaban.find(jawaban => {
                    return jawaban.equals(jawaban_id)
                })
               
                pertanyaan.jawaban.pull(jawabanSelected)
                articelHasJawaban = pertanyaan
                return Jawaban.findById(jawaban_id)
            })
            .then( jawaban => {
                return Promise.all([ articelHasJawaban.save(), jawaban.remove()])
            })
            .then( response =>{
                res.status(200).json({ message : 'success'})
            })
            .catch( error =>{
                console.log( error )
                res.status(500).json({ message : error.message })
            })
    }
}