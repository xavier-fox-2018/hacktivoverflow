var express = require('express');
var router = express.Router();
const Answer = require('../models/answer')
const auth = require('../middleware/authentication')

router.get('/', (req, res, next) => {
  Answer.find({})
  .populate('user')
  .populate('question')
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  });
})

router.get('/:questionId', (req, res, next) => {
  Answer.find({
    question: req.params.questionId
  })
  .populate('user')
  .populate('question')
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  });
})

router.post('/', auth, (req, res)=>{
  Answer.create({
    user: req.body.user,
    answer: req.body.answer,
    question: req.body.question
  })
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  });
})

router.put(`/:id`,  auth, (req, res)=>{
  console.log(req.params, req.user)
  Answer.find({_id:req.params.id, user: req.user.id})
  .then((result) => {
    console.log(result)
    if(result.length > 0) {
      Answer.findByIdAndUpdate(req.params.id, {
        user: req.user.id,
        answer: req.body.answer,
        question: req.body.question
      })
      .populate('user')
      .populate('question')
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(500).json(err)
      });
    }
  }).catch((err) => {
    res.status(500).json(err)
  });
})

router.put('/upvote/:id', auth, (req, res)=>{
  Answer.find({_id: req.params.id, user: req.user.id})
  .then((result) => {
    if(result < 1) {
      Answer.findByIdAndUpdate(req.params.id, { 
        $pull: { 
          userLike: req.user.id,
          userDislike: req.user.id 
        }
      })
      .then((result) => {
        console.log('bserhasil negePULLLLLLLL')
    
        Answer.findByIdAndUpdate(req.params.id, {
          $push: {
            userLike: req.user.id
          }
        })
        .then(result=>{
          console.log('bserhasil ngepuhsss')
          res.status(200).json(result)
        })
      }).catch((err) => {
        res.status(400).json(err)
      })
    } else {
      res.status(400).json({message: 'You can\'t vote your own answer'})
    }
  }).catch((err) => {res.status(500).json(err)});
})

router.put('/downvote/:id', auth, (req, res)=>{
  Answer.find({_id: req.params.id, user: req.user.id})
  .then((result) => {
    if(result < 1) {
      Answer.findByIdAndUpdate(req.params.id, { 
        $pull: { 
          userLike: req.user.id,
          userDislike: req.user.id 
        }
      })
      .then((result) => {
        Answer.findByIdAndUpdate(req.params.id, {
          $push: {
            userDislike: req.user.id
          }
        })
        .then(result=>{
          res.status(200).json(result)
        })
      }).catch((err) => {
        res.status(400).json(err)
      })
    } else {
      res.status(400).json({message: 'You can\'t vote your own answer'})
    }
  }).catch((err) => {res.status(500).json(err)});
})
// router.delete('/:id',  auth, (req, res)=>{
//   Answer.findByIdAndDelete(req.params.id)
//   .then((result) => {
//     res.status(200).json(result)
//   }).catch((err) => {
//     res.status(500).json(err)
//   });
// })

module.exports = router