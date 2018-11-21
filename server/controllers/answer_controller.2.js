const   Answer = require('../models/answer'),
        User = require('../models/user'),
        Question = require('../models/question');

class AnswerController {
    static create (req, res){
        console.log(`masuk create answer controller`)
        console.log(req.headers)
        //cari dulu questionnya udah pernah ada yang jawab atw belum
        Question.findOne({_id:req.headers.id})
            .then(question => {
                console.log(`hasil result`)
                console.log(question)
                //kalo sudah ada, jawabannya di push ke dalam answer di questionId
                question.update({$push:{answer:{
                    UserId:req.myId, 
                    description:req.body.description
                }}})
                .then( result2 => {
                    console.log(`ini result setelah update answer`)
                    console.log(result2)
                    //save ke kontribution user dulu
                    User.findById(req.myId)
                        .then( user => {
                            user.update({$push:{contribution:{
                                answerId:question._id, 
                                description:req.body.description
                            }}})
                            .then( resultAkhir => {
                                res.status(200).json("success create answer")
                            })
                            .catch( error => {
                                console.log(`error setelah update kontribution di user`)
                                console.log(error)
                                res.status(500).json("Something went wrong, please call developer!")
                            })
                        })
                        .catch( error => {
                            console.log(`error saat find user by id`)
                            console.log(error)
                            res.status(500).json("Something went wrong, please call developer!")
                        })
                })
                .catch( error => {
                    res.status(500).json({"error":"Something went wrong, please call developer!"})
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json( {error : error, message : "Something went wrong, please call developer!"} )
            })
    }

    static readOwn (req, res){
        console.log(`masuk read own answer`)
        console.log(req.myId)
        User.findOne({_id : req.myId})
            .populate('AnswerId')
            .then( result => {
                console.log(`masuk read all answer`)
                console.log(result.contribution)
                res.status(200).json( 'done' )
            })
            .catch( error => {
                console.log(`error di read all answer`)
                console.log(error)
                res.status(500).json( {error : error, message : "Something went wrong, please call developer!"} )
            })
    }

    static readAll (req, res){
        Answer.find()
            .then( answer => {
                console.log(`masuk read all answer`)
                console.log(answer)
                res.status(200).json( answer )
            })
            .catch( error => {
                console.log(`error di read all answer`)
                console.log(error)
                res.status(500).json( {error : error, message : "Something went wrong, please call developer!"} )
            })
    }

    static update (req, res){
        Answer.updateOne({ _id : req.headers.id}, {
            // UserId: require.headers.id,
            description: req.body.description     
        })
        .then( answer => {
            console.log(`masuk read all update`)
            console.log(answer)
            res.status(200).json( answer )
        })
        .catch( error => {
            console.log(`error di read all update`)
            console.log(error)
            res.status(500).json( {error : err, message : "Something went wrong, please call developer!"} )
        })
    }

    static upvote (req, res){
        //cari answernya
        Answer.findById(req.headers.id)
            .then( result => {
            console.log(result)
                //cek apakah answernya tesebut dibuat oleh user yang akan vote, jika iya, maka jangan berikan akses
                if (result.UserId == req.myId){
                    res.status(500).json({"error":"can't vote for your own article or comment! "})
                } else {
                    //bila bukan, maka cek apakah sudah ada upvote dari user tersebut, kalo belum ada maka push ke upvote user tersebut
                    let upvoteArr = result.upvote
                    if (upvoteArr.indexOf(req.myId) === -1 ){
                        result.update({$push: {upvote: req.myId}, $pull: {downvote: req.myId}})
                            .then( result => {
                                res.status(200).json("success upvote")
                            })
                            .catch( error => {
                                res.status(500).json({"error":"can't vote for your own article or comment! "})
                            })
                    }
                    //kalo sudah ada, maka hilangkan status upvote dari user tersebut
                    else{
                        result.update({$pull: {upvote: req.myId}})
                            .then( result => {
                                res.status(200).json("success unupvote")
                            })
                            .catch( error => {
                                res.status(500).json({"error":"can't vote for your own article or comment! "})
                            })    
                    }
                }
            })
            .catch( error => {
                console.log(error)
                res.status(500).json({"error":"can't vote for your own article or comment! "})
            })
    }

    static downvote (req, res){
        //cari answernya
        Answer.findById(req.headers.id)
            .then( result => {
            console.log(result)
                //cek apakah answernya tesebut dibuat oleh user yang akan vote, jika iya, maka jangan berikan akses
                if (result.UserId == req.myId){
                    res.status(500).json({"error":"can't vote for your own article or comment! "})
                } else {
                    //bila bukan, maka cek apakah sudah ada upvote dari user tersebut, kalo belum ada maka push ke upvote user tersebut
                    let downvote = result.downvote
                    if (downvote.indexOf(req.myId) === -1 ){
                        result.update({$push: {downvote: req.myId}, $pull: {upvote: req.myId}})
                            .then( result => {
                                res.status(200).json("success downvote")
                            })
                            .catch( error => {
                                res.status(500).json({"error":"can't vote for your own article or comment! "})
                            })
                    }
                    //kalo sudah ada, maka hilangkan status upvote dari user tersebut
                    else{
                        result.update({$pull: {downvote: req.myId}})
                            .then( result => {
                                res.status(200).json("success undownvote")
                            })
                            .catch( error => {
                                res.status(500).json({"error":"can't vote for your own article or comment! "})
                            })    
                    }
                }
            })
            .catch( error => {
                console.log(error)
                res.status(500).json({"error":"can't vote for your own article or comment! "})
            })
    }
}

module.exports = AnswerController