const ModelQuestion = require('../models/question')
const ModelAnswer = require('../models/answer')
// const ObjectId = require('mongoose').Types.ObjectId
class Question {
    static all(req, res) {
        ModelQuestion.find({
        })
        .populate('answer')
         .then(data=>{
             res.status(201).json({
                message : 'Get all questions succeed',
                data : data
             })
         })
         .catch(err=>{
             res.status(500).json({
                message : 'Get All Q failed'
             })
         })
    }

    static getOne(req, res) {
        ModelQuestion.findById({
            _id : req.params.id
        }).populate('answer')
         .then(data=>{
             res.status(201).json({
                message : 'Get one data questions succeed',
                data : data
             })
         })
         .catch(err=>{
             res.status(500).json({
                message : 'Get All Q failed'
             })
         })
    }

    static add(req, res) {
        ModelQuestion.create({
            title : req.body.title,
            content : req.body.content
        })
         .then(data=>{
             res.status(201).json({
                message : 'Get all questions succeed',
                data : data
             })
         })
         .catch(err=>{
             res.status(500).json({
                message : 'Get All Q failed'
             })
         })
    }

    static answer(req, res){
        
        let newAnswer = new ModelAnswer({
            content : req.body.answer
        })
      
        newAnswer.save()
            .then( reponse => {
                ModelQuestion.findById(req.params.id)
                .then(data=>{
                    data.answer.push(newAnswer._id)
                    // console.log( data )
                    return data.save()  //chaining promise
                    //console.log( data )
                    
                })
                .then( response => {
                    res.status(200).json( response )
                    })
                    .catch(err=>{
                        console.log('masuk error', err)
                        res.status(500).json({
                            message : 'error',
                            error : err
                        })
                    })
                })
                .catch( error => {
                res.status(500).json()
                })
        
    }

    static deleteAnswer(req, res){
        ModelAnswer.findOne({
            _id : req.params.id
        })
         .then(data=>{
             res.status(200).json({
                 message : 'Delete  data success',
                 data : data
             })
         })
         .catch(err=>{
             res.status(500).json({
                 message : err
             })
         })
    }
}

module.exports = Question