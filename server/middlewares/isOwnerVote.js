const jwtHelper = require('../helpers/jwtHelper')
const Question = require('../models/Question')

function isOwnerVote(req, res, next){
    let user = jwtHelper.decode(req.headers.token)
    Question.findOne({
        _id: req.params.id
    })
        .then(Question=>{
            if(Question.author == user.id){
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

module.exports = isOwnerVote