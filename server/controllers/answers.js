require('dotenv').config()
const Answer = require('../models/answers')
const Question = require('../models/questions')

class AnswerController {
  static getOneAnswer (req, res) {
    Answer.findById(req.params.id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static postAnswer (req, res) {
    Answer.create({
      content: req.body.content,
      writer: req.decoded.id
    })
      .then(data => {
        Question.findById(req.params.id)
          .then(question => {
            let arrOfQuest = question.answers.slice()
            arrOfQuest.push(data._id)
            Question.updateOne({
              _id: req.params.id
            }, {
              $set: { answers: arrOfQuest }
            })
              .then(response => {
                res.status(201).json({ message: "Answer posted!" })
              })
              .catch(err => {
                res.status(500).json(err)
              })
          })
          .catch(err => {
            res.status(500).json(err)
          })
      })
      .catch(err => {
        res.status(500).json(err)
      })
    
  }

  static updateAnswer(req, res) {
    Answer.findOneAndUpdate({ 
      _id: req.params.id
    }, {
      content: req.body.content
    }, {
      upsert: true
    })
      .then(data => {
        res.status(200).json({ message: "Answer updated!" })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static vote (req, res) {
    Answer.findById(req.params.id)
      .then(data => {
        let count = 0
        let changed = false
        if (data.votes.length > 0) {
          data.votes.forEach(vote => {
            count++
            if (vote.userId == req.decoded.id) {
              if (vote.value == req.body.value) {
                Answer.findByIdAndUpdate(req.params.id, { 
                  $pull: { votes: { userId: req.decoded.id } }
                })
                  .then(response => {
                    changed = true
                    console.log('masuk vote canceled')
                    res.status(201).json({ message: "Vote canceled!" })
                  })
                  .catch(err => {
                    res.status(500).json(err)
                  })
              } else {
                Answer.findById(req.params.id)
                  .then(response => {
                    let arrOfVotes = response.votes
                    arrOfVotes.forEach(element => {
                      if (element.userId == req.decoded.id) {
                        element.value = req.body.value
                      }
                    })
                    Answer.findByIdAndUpdate(req.params.id, {
                      $set: { votes: arrOfVotes }
                    })
                      .then(data => {
                        changed = true
                        console.log('masuk vote updated')
                        res.status(201).json({ message: "Vote updated!" })
                      })
                      .catch(err => {
                        res.status(500).json(err)
                      })
                  })
                  .catch(err => {
                    res.status(500).json(err)
                  })
              }
            } else {
              console.log(count, data.votes.length, changed)
              if (count == data.votes.length && changed == false) {
                console.log('masuk voted', changed)
                Answer.findByIdAndUpdate(req.params.id, {
                  $push: { votes: { userId: req.decoded.id, value: req.body.value } }
                })
                  .then(response => {
                    res.status(201).json({ message: "Voted!"})
                  })
                  .catch(err => {
                    res.status(500).json(err)
                  })
              }
            }
          })
        } else {
          Answer.findByIdAndUpdate(req.params.id, {
            $push: { votes: { userId: req.decoded.id, value: req.body.value } }
          })
            .then(response => {
              res.status(201).json({ message: "Voted!"})
            })
            .catch(err => {
              res.status(500).json(err)
            })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = AnswerController
