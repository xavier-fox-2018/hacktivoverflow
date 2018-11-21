const   Question = require('../models/question');

class QuestionController {
    static create ( req, res ){
        console.log(`masuk create question controller`)
        console.log(req.body)
        let question = new Question({
            UserId: req.myId,
            title: req.body.title,
            description: req.body.description,
            dateCreate: new Date()
        })
        question.save( (err, data) => {
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

    static readAll (req, res){
        Question.find()
            .then( questions => {
                console.log(`masuk read all question`)
                console.log(questions)
                res.status(200).json( questions )
            })
            .catch( error => {
                console.log(`error di read all question`)
                console.log(error)
                res.status(500).json( {error : error, message : "Something went wrong, please call developer!"} )
            })
    }

    static readOwnQuestions (req, res){
        Question.find({ UserId : req.myId})
        .then( questions => {
            console.log(`masuk read all question`)
            console.log(questions)
            res.status(200).json( questions )
        })
        .catch( error => {
            console.log(`error di read all question`)
            console.log(error)
            res.status(500).json( {error : error, message : "Something went wrong, please call developer!"} )
        })
    }

    static readDetailQuestions (req, res){
        Question.findOne({ _id : req.headers.id})
        .then( questions => {
            console.log(`masuk read detail question`)
            console.log(questions)
            res.status(200).json( questions )
        })
        .catch( error => {
            console.log(`error di read all question`)
            console.log(error)
            res.status(500).json( {error : error, message : "Something went wrong, please call developer!"} )
        })
    }

    static update (req, res){
        Question.updateOne({ _id : req.headers.id}, {
            // UserId: require.headers.id,
            title: req.body.title,
            description: req.body.description          
        })
        .then( questions => {
            console.log(`masuk read all update`)
            console.log(questions)
            res.status(200).json( questions )
        })
        .catch( error => {
            console.log(`error di read all update`)
            console.log(error)
            res.status(500).json( {error : err, message : "Something went wrong, please call developer!"} )
        })
    }

    static delete (req, res){
        Question.findByIdAndDelete(req.headers.id)
        .then( questions => {
            console.log(`masuk delete question`)
            console.log(questions)
            res.status(200).json( questions )
        })
        .catch( error => {
            console.log(`error delete question`)
            console.log(error)
            res.status(500).json( {error : err, message : "Something went wrong, please call developer!"} )
        })
    }

    static upvote (req, res){
        //cari questionnya
        Question.findById(req.headers.id)
            .then( result => {
            console.log(result)
                //cek apakah question tesebut dibuat oleh user yang akan vote, jika iya, maka jangan berikan akses
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
        //cari questionnya
        Question.findById(req.headers.id)
            .then( result => {
            console.log(result)
                //cek apakah question tesebut dibuat oleh user yang akan vote, jika iya, maka jangan berikan akses
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

module.exports = QuestionController