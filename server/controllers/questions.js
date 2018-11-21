require('dotenv').config()
const Question = require('../models/questions')

class QuestionController {
  static getQuestion (req, res) {
    Question.find()
      .populate('author', "-password -salt")
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static getOneQuestion (req, res) {
    Question.findById(req.params.id)
      .populate({
        path: 'answers',
        populate: { path: 'writer', select: '-password -salt' }
      })
      .populate('author')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static postQuestion (req, res) {
    let question = new Question ({
      title: req.body.title,
      content: req.body.content,
      author: req.decoded.id
    })

    question.save()
      .then(data => {
        res.status(201).json({ message: 'Question posted!' })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }

  static updateQuestion (req, res) {
    Question.findOneAndUpdate({ 
      _id: req.params.id,
      author: req.decoded.id
    }, {
      title: req.body.title,
      content: req.body.content
    }, {
      upsert: true
    })
      .then(data => {
        res.status(200).json({ message: "Question updated!" })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteQuestion (req, res) {
    console.log('masuksini')
    Question.findOneAndDelete({
      _id: req.params.id,
      author: req.decoded.id
    })
      .then(data => {
        res.status(200).json({ message: "Question deleted!"})
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }

  static vote (req, res) {
    Question.findById(req.params.id)
      .then(data => {
        let count = 0
        let changed = false
        if (data.votes.length > 0) {
          data.votes.forEach(vote => {
            count++
            if (vote.userId == req.decoded.id) {
              if (vote.value == req.body.value) {
                Question.findByIdAndUpdate(req.params.id, { 
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
                Question.findById(req.params.id)
                  .then(response => {
                    let arrOfVotes = response.votes
                    arrOfVotes.forEach(element => {
                      if (element.userId == req.decoded.id) {
                        element.value = req.body.value
                      }
                    })
                    Question.findByIdAndUpdate(req.params.id, {
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
                Question.findByIdAndUpdate(req.params.id, {
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
          Question.findByIdAndUpdate(req.params.id, {
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

module.exports = QuestionController
