const Comment = require('../models/comment')
      Question = require('../models/question'),
      User = require('../models/user')

class Controller {

    static create(req, res) {
        
        const comment = new Comment({
            user_comment: req.body.comment,
            description: req.body.description,
            user_id: req.data._id,
            like: 0
        })

        comment.save(function(err, comment) {
            if (err) {
                console.log('salah di save nya, ' + err);
                res.status(500).json({message: err})
            }
            else {
                User.findOneAndUpdate({
                    _id: req.data._id
                }, {
                    $push: { question_list: question._id}
                })
                    .then(() => {
                        console.log('Added question to User');
                        res.status(201).json({
                            message: `Successfully added ${req.body.title} to ${req.data.name}'s list of questions`
                        })                        
                    })

                    .catch(err => {
                        res.status(500).json({message: err})
                    })
            }
        })
    }

    static showAllQuestion(req, res) {
        Question.find({})
            .populate('author')
            .then( questions => {
                res.status(200).json({
                    data: questions
                })
            })
            .catch(err => {
                console.log('salah di show all question nya, ' + err);
                res.status(500).json({message: err})
            })
    }

    static showAllUserQuestion(req, res) {
        Question.find({
            author: req.data._id
        })
         .then( questions => {
            res.status(200).json({
                data: questions
            })
         })
         .catch(err => {
            console.log('salah di show all question punya user nya, ' + err);
            res.status(500).json({message: err})
         })
    }

    static getQuestion(req,res) {
        Question.findOne({
            _id : req.params.id
        })
            .then( question => {
                res.status(200).json({
                    data: question
                })
            })

            .catch(err => {
                console.log('salah di get satu question' + err);
                res.status(500).json({err:err})
            })
    }

    static update(req,res){
        Question.findOne({
            _id: req.params.id
        })
          .then( question =>{
                console.log(req.data._id);
                
                console.log(question.author_id);
              
            if(question.author.toString() === req.data._id){
                Question.findOneAndUpdate({
                    _id: req.params.id
                },{
                    $set: {
                       title:req.body.title,
                       description: req.body.description 
                    }
                })
                  .then(newQuestion =>{     
                    res.status(201).json({
                        data: newQuestion
                    }) 
                  })
                  .catch(err =>{
                    console.log('error update nya, ' + err);
                    res.status(500).json({message: err})
                  })
            }
            else if(question.author.toString() !== req.data._id){
                console.log('user nga ada permission ke question');
                res.status(500).json({message: 'User have no permission to update this question'})
            }
          })
          .catch(err =>{
            console.log('error cari question nya, ' + err);
            res.status(500).json({message: err})
          })
    }

    static search(req, res) {
        Question.find({$or: [
            {title: new RegExp(req.query.search, 'i')},
            // {author: new RegExp(req.query.search, 'i')},
            {description: new RegExp(req.query.search, 'i')}
        ]})
        .populate('author')
            .then(questions => {
                console.log('search nya jalan');
                res.status(200).json({
                    data:questions
                })
            })
            .catch(err => {
                console.log('nga bisa search ' + err);
            })
        
       
        
    }
}

module.exports = Controller 