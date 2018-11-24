const Answer = require('../models/answers')
const Question = require('../models/questions')

class Controller {
    static create(req,res){
        if (!req.body.description || req.body.description.length === 0) {
            res.status(500).json({message: 'Cannot post empty answer'})
        }else{
            Answer.create({
                description : req.body.description,
                author : req.userData._id //ini diambil dari hasil cek token di middleware
            })
            .then((result)=>{
                Question.findOneAndUpdate({
                    _id : req.params.id
                },{
                    $push : {
                        answers : result._id
                    }
                })
                .then((response)=>{
                    res.status(201).json(response)
                })
                .catch((err)=>{
                    res.status(500).json({
                        message : 'failed to post answer'
                    })
                })
                
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'comment failed'
                })
            })
        }
    }

    static read(req,res){
        Answer.find()
        .then((result)=>{
            res.status(201).json({
                data : result
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'read article failed'
            })
        })
    }

    static readOne(req,res){
        Answer.findById(req.params.id)
        .then((answer)=>{
            res.status(200).json(answer)
        })
        .catch((error)=>{
            res.status(500).json({
                message : "Faled To Read Answer Data"
            })
        })
    }

    static update(req,res){
        Answer.findOneAndUpdate({
            _id : req.params.id
        },{
            description : req.body.description,
            author : req.userData._id
        },{
            new : true
        })
        .then((updatedAnswer)=>{
            res.status(200).json(updatedAnswer)
        })
        .catch((error)=>{
            res.status(500).json({
                message : "Error Updating Answer"
            })
        })
    }

    static delete(req,res){
        Answer.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.status(200).json({
                message : 'delete success'
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'delete failed',
                err : err
            })
        })
    }

}

module.exports = Controller;