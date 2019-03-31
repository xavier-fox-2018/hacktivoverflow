var express = require('express');
var router = express.Router();
const Question = require('../models/question')
const auth = require('../middleware/authentication')
const textToSpeech = require('@google-cloud/text-to-speech')

router.post('/', auth, (req, res)=>{
  console.log('masuk server create question', req.body.tags)
  Question.create({
    questioner: req.body.questioner,
    title: req.body.title,
    contents: req.body.contents
    ,tags: req.body.tags
  })
  .then((result) => {
    res.status(201).json(result)
  }).catch((err) => {
    console.log(err)
    res.status(400).json(err)
  });                                                                                                                                                                                                                                                                                                              
})

router.get('/', (req, res)=>{
  Question.find({})
  .populate('questioner')
  .populate('answers')
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(400).json(err)
  });
})

router.get('/:id', (req, res)=>{
  Question.findById(req.params.id)
  .populate('questioner')
  .populate('answers')
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(400).json(err)
  });
})

router.put('/:id', auth, (req, res)=>{
  Question.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    contents: req.body.contents,
    tags: req.body.tags
  })
  .then((result) => {
    console.log('==========>', result)
    res.status(200).json(result)
  }).catch((err) => {
    res.status(400).json(err)
  });
})

router.patch('/:id/:key/:value', auth, (req, res)=>{
  Question.findByIdAndUpdate(req.params.id, {
    [[req.params.key]]: req.params.value
  })
  .then((result) => {
    console.log('==========>', result)
    res.status(200).json(result)
  }).catch((err) => {
    res.status(400).json(err)
  });
})

router.delete('/:id', auth, (req, res)=>{
  Question.findByIdAndDelete(req.params.id)
  .then((result) => {
    console.log('==========>', result)
    res.status(200).json(result)
  }).catch((err) => {
    res.status(400).json(err)
  });
})

router.put('/upvote/:id', auth, (req, res)=>{
  Question.find({_id: req.params.id, questioner: req.user.id})
  .then((result) => {
    if(result.length < 1) {
      Question.find({_id: req.params.id, userLikes: req.user.id})
      .then((result) => {
        if(result.length < 1) {
          Question.find({_id: req.params.id, userDislikes: req.user.id})
          .then((result) => {
            if(result) {
              Question.findByIdAndUpdate(req.params.id, { 
                $pull: { 
                  userDislikes: req.user.id 
                }
              })
              .then((result) => {
                Question.findByIdAndUpdate(req.params.id, {
                  $push: {
                    userLikes: req.user.id
                  }
                })
                .then(result=>{
                  res.status(200).json(result)
                }).catch(err=>{res.status(500).json(err)})
              }).catch((err) => {
                res.status(400).json(err)
              })
            } else {
                Question.findByIdAndUpdate(req.params.id, {
                  $push: {
                    userLikes: req.user.id
                  }
                })
                .then(result=>{
                  res.status(200).json(result)
                }).catch(err=>{res.status(500).json(err)})
            }
          }).catch((err) => {res.status(500).json(err)});
        } else {
          res.status(400).json({message:'cannot likes more than once'})
        }
      }).catch((err) => {res.status(500).json(err)});
    } else {
      res.status(400).json({message: 'You cannot give vote to your own Question'})
    }
  }).catch((err) => {res.status(500).json(err)});
})

router.put('/downvote/:id', auth, (req, res)=>{
  Question.find({_id: req.params.id, questioner: req.user.id})
  .then((result) => {
    if(result.length < 1) {
      Question.find({_id: req.params.id, userDislikes: req.user.id})
      .then((result) => {
        if(result.length < 1) {
          Question.find({_id: req.params.id, userLikes: req.user.id})
          .then((result) => {
            if(result) {
              Question.findByIdAndUpdate(req.params.id, { 
                $pull: { 
                  userLikes: req.user.id 
                }
              })
              .then((result) => {
                Question.findByIdAndUpdate(req.params.id, {
                  $push: {
                    userDislikes: req.user.id
                  }
                })
                .then(result=>{
                  res.status(200).json(result)
                }).catch(err=>{res.status(500).json(err)})
              }).catch((err) => {
                res.status(400).json(err)
              })
            } else {
                Question.findByIdAndUpdate(req.params.id, {
                  $push: {
                    userDislikes: req.user.id
                  }
                })
                .then(result=>{
                  res.status(200).json(result)
                }).catch(err=>{res.status(500).json(err)})
            }
          }).catch((err) => {
            res.status(500).json(err)
          });
        } else {
          res.status(400).json({message:'cannot likes more than once'})
        }
      }).catch((err) => {
        res.status(500).json(err)
      });
    } else {
      res.status(400).json({message: 'You cannot give vote to your own Question'})
    }
  }).catch(err=>{res.status(500).json(err)})
})

router.put('/views/:id', (req, res)=>{
  Question.findById(req.params.id)
  .then((result) => {
    let newView = result.data.views++
    Question.updateOne({
      views: newView
    })
    then(result=>{
      res.status(200).json(result)
    })
  }).catch((err) => {
    res.status(400).json(err)
  });
})

router.post('/text-to-speech', (req, res)=>{
  const fs = require('fs');
  const path = require('path');
  const client = new textToSpeech.TextToSpeechClient();
  const request = {
    input: {text: req.body.text},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', voiceName: 'en-US-Wavenet-A', ssmlGender: 'MALE'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };
  let outputFile = 'output'+req.body.id+'.mp3'
  // let path = `/path/to/file/${outputFile}`
  client.synthesizeSpeech(request, (err, result) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    
    fs.writeFile(outputFile, result.audioContent, 'binary', err => {
      if (err) {
        console.error('ERROR:', err);
          return;
        }
        console.log(`Audio content written to file: ${outputFile}`);
        
        res.status(200).json({message:'success write file',text:req.body.text})
        // test send to clie

      });
  });
})

module.exports = router