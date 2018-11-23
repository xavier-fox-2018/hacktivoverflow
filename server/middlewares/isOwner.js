const jwtHelper = require('../helpers/jwtHelper')
const Question = require('../models/Question')

class isOwner{

    static question(req,res,next){
        const user = req.decoded
        Question.findOne({
            _id: req.params.id
        })
            .then(question=>{
                if(question.author == user.id){
                    next()
                } else {
                    res.status(403).json({
                        message: 'Forbidden'
                    })
                }
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            })
    }
    
    static voteQuestion(req,res,next){
        const user = req.decoded
        Question.findOne({
            _id: req.params.id
        })
            .then(question=>{
                if(question.author == user.id){
                    res.status(400).json({errors: {
                        vote: {
                            message: 'Cannot Vote your own question'
                        }
                    }})
                } else {
                    next()
                }
            })
            .catch(err=>{
                res.status(500).json({message:'Internal Server Error'})
            })
    }
    
}

module.exports= isOwner