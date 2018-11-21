const   Answer = require('../models/answer'),
        User = require('../models/user'),
        Question = require('../models/question');

class AnswerController {
    static create (req, res){
        console.log(`masuk create answer controller`)
        console.log(req.headers)
        //cari dulu questionnya udah pernah ada yang jawab atw belum
        Answer.findOne({QuestionId:req.headers.id})
            .then(answer => {
                //kalo sudah ada jawaban, di push aja ke array jawaban
                if(answer){
                    answer.update({$push:{answer:{
                        UserId:req.myId, 
                        description:req.body.description
                    }}})
                    .then( result => {
                        console.log(`setelah save data`)
                        console.log(result)
                        res.status(200).json( "save success" )
                    })
                    .catch( err => {
                        console.log(err)
                        res.status(500).json( {error : err, message : "Something went wrong, please call developer!"} )
                    })
                } else {
                    //kalo belum ada, buat jawaban baru
                    let answer = new Answer({
                        QuestionId : req.headers.id,
                        answer : [{
                            UserId:req.myId, 
                            description:req.body.description
                        }]
                    })
                    answer.save( (err, data) => {
                        if (err) {
                            console.log(err)
                            res.status(500).json( {error : err, message : "Something went wrong, please call developer!"} )
                        } else {
                            console.log(`setelah save data`)
                            console.log(data)
                            res.status(200).json( data )
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json( {error : error, message : "Something went wrong, please call developer!"} )
            })
    }

    static readOwn (req, res){
         Answer.find().lean().exec(function(err, result){
            if (err){
                res.status(500).json( err )
            } else {
                let resultArr = []
                for ( let i = 0; i < result.length; i++){
                    for ( let j = 0; j < result[i].answer.length; j++){
                        if ( req.myId == result[i].answer[j].UserId){
                            resultArr.push({
                                mainId : result[i]._id,
                                answerId : result[i].answer[j]._id,
                                description : result[i].answer[j].description,
                                upvote : result[i].answer[j].upvote,
                                downvote : result[i].answer[j].downvote
                            })
                        }
                    }
                }
                res.status(200).json( resultArr )
            }
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
/*       Answer.findByIdAndUpdate(req.headers.mainid).lean().exec(function(err, result){
            if (err){
                res.status(500).json( err )
            } else {
                console.log(`masuk update setelah di find`)
                console.log(result)
                for ( let j = 0; j < result.answer.length; j++){
                    console.log(`masuk looping ke-2`)
                    console.log(result.answer[j])
                    if ( req.headers.answerid == result.answer[j]._id){
                        console.log(`masuk if dalam looping`)
                        console.log(result.answer[j].description)
                        result.answer[j].description = req.body.description
                        console.log(result)
                        result.save
                    }
                }
            res.status(200).json( result )
            }
        })*/
        Answer.updateOne({ _id : req.headers.mainid}, {
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