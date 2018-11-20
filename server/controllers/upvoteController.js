const Answer = require('../models/answers')
const Question = require('../models/questions')

class Controller {
    static createQ(req,res){
        Question.findOneAndUpdate({
            _id : req.params.id
        },{
            $pull : {
                upvotes : req.userData._id,
                downvotes : req.userData._id
            }
        })
        .then((response)=>{
            Question.findOneAndUpdate({
                _id : req.params.id
            },{
                $push : {
                    upvotes : req.userData._id
                }
            })
            .then((response)=>{
                res.status(201).json({
                    message : 'upvote success'
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'failed to post answer'
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'failed to post answer'
            })
        })
    }

    static createA(req,res){
        Answer.findOneAndUpdate({
            _id : req.params.id
        },{
            $pull : {
                upvotes : req.userData._id,
                downvotes : req.userData._id
            }
        })
        .then((response)=>{
            Answer.findOneAndUpdate({
                _id : req.params.id
            },{
                $push : {
                    upvotes : req.userData._id
                }
            })
            .then((response)=>{
                res.status(201).json({
                    message : 'upvote success'
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'failed to post answer'
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'failed to post answer'
            })
        })
    }

    static read(req,res){
        
    }

    static readOne(req,res){

    }

}

module.exports = Controller;