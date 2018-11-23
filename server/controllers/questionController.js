const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answer')

class QuestionController {

    static create (req, res) {
      Question
        .create({
          title : req.body.title,
          content : req.body.content,
          owner : req.user.id     
        })
        .then(data => {
          res.status(201).json(data)
        })
        .catch(err => {
          res.status(500).json(err)
        }) 
    }
  
    static read (req, res) {
      Question
        .find({})
        .populate('owner', "-password")
        .then(data => {
          res.status(200).json(data)
        })
        .populate('owner', "-password")
        .catch(err => {
          res.status(500).json(err)
        }) 
    }
  
    static readById (req, res) {
      Question
        .findById(req.params.id)
        .populate('owner', "-password")
        .then(data => {
          res.status(200).json(data)
        })
        .catch(err => {
          res.status(500).json({
            err : err,
            msg : 'Invalid id Question'
          })
        })
    }
  
    static readByOwnerId (req, res) {
      Question
        .find({
          owner: req.user.id
        })
        .populate('owner', "-password")
        .then(data => {
          res.status(200).json(data)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  //
    static delete (req, res) {
      Question
        .findOne({
          _id: req.params.id
        })
        .then(data => {
          return new Promise((resolve, reject) => {
            if (data.owner.equals(req.user.id)) {
              Answer.deleteMany({question:req.params.id})
              resolve() 
            } else {
              reject({msg : 'Access Unauthorized'})
            }
          })
        })
        .then(() => {
          Question
            .deleteOne({
              _id : req.params.id
            })
            .then(data => {
              res.status(200).json({
                msg : 'delete success',
                data : data
              })
            })
            .catch(err => {
              res.status(500).json({
                msg : 'delete failed',
                err : err
              })
            })
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  
    static update (req, res) {
      Question
        .findOne({
          _id: req.params.id
        })
        .then(data => {
          if(data.owner.equals(req.user.id)) {
            data.title = req.body.title;
            data.content = req.body.content; 
            return data.save()
          } else {
            res.status(400).json({
              msg : 'Access Unauthorized'
            })
          }
        })
        .then(data => {
          res.status(200).json(data)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
    
    static upvote(req, res) {
      Question
        .findById(req.params.questionId)
        .then(question => {
          if(question.owner.equals(req.user.id)) {
            res.status(400).json({
              msg : 'you cannot upvote your own question'
            })
          } else {
            let downvoteAlready = (question.downvotes.indexOf(req.user.id) !== -1);
            let upvoteAlready = (question.upvotes.indexOf(req.user.id) !== -1);
            console.log(downvoteAlready)
            console.log(upvoteAlready)
            if (!downvoteAlready && !upvoteAlready) {
              question
                .update({
                  $push : {
                    upvotes: req.user.id
                  }
                })
                .then(data => {
                  res.status(200).json(data)
                })
                .catch(err => {
                  res.status(500).json(err)
                })
            } else if (downvoteAlready) {
              question
                .update({
                  $pull : {
                    downvotes : req.user.id
                  }
                })
                .then(data => {
                  return question.update({
                    $push : {
                      upvotes: req.user.id
                    }
                  })
                })
                .then(data => {
                  res.status(200).json({
                    msg : 'upvote success',
                    data: data
                  })
                })
                .catch(err => {
                  res.status(500).json(err)
                })
            } else if (upvoteAlready) {
              question
                .update({
                  $pull : {
                    upvotes : req.user.id
                  }
                })
                .then(data => {
                  res.status(200).json({
                    msg : 'removing upvotes success'
                  })
                })
                .catch(err => {
                  res.status(500).json(err)
                })
            } 
          }
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }

    static downvote(req, res) {
      Question
        .findById(req.params.questionId)
        .then(question => {
          if(question.owner.equals(req.user.id)) {
            res.status(400).json({
              msg : 'you cannot downvote your own post'
            })
          } else {
            let downvoteAlready = (question.downvotes.indexOf(req.user.id) !== -1);
            let upvoteAlready = (question.upvotes.indexOf(req.user.id) !== -1);
            if (!downvoteAlready && !upvoteAlready) {
              question
                .update({
                  $push : {
                    downvotes : req.user.id
                  }
                })
                .then(data => {
                  res.status(200).json({
                    msg : 'downvote success'
                  })
                })
                .catch(err => {
                  res.status(500).json(err)
                })
            } else if (upvoteAlready) {
              question
                .update({
                  $pull : {
                    upvotes : req.user.id
                  }
                })
                .then(data => {
                  return question.update({
                    $push : {
                      downvotes : req.user.id
                    }
                  })
                })
                .then(data => {
                  res.status(200).json({
                    msg : 'downvote success'
                  })
                })
                .catch(err => {
                  res.status(500).json(err)
                })
            } else if (downvoteAlready) {
              question
                .update({
                  $pull : {
                    downvotes : req.user.id
                  }
                })
                .then(data => {
                  res.status(200).json({
                    msg : 'remove downvote'
                  })
                })
                .catch(err => {
                  res.status(500).json(err)
                })
            }
          }
        })
    }
  
  }
  
  module.exports = QuestionController;

