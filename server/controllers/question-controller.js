const Question = require('../models/Question')

module.exports = {
    addQuestion: (req, res) =>{
        console.log(`adaaa`);
        
        Question.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.decoded.id,
        })
        .then(response => {
            res.status(201).json({
                message: `Question Successfully Created!`,
                data: response
            });
        })
        .catch(err => {
            res.status(400).json({
            message: `Internal Server Error!`
            });
        })
    },

    getAll: (req, res) =>{
        // console.log(`dataa`);
        Question.find({})
        .populate("userId")
        .populate("answerId")
        .sort({createdAt: 'desc'})
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(`err`,err);
            res.status(400).json({
                message: `Internal Server Error!`
            });
        })
    },

    myQuestion: (req, res) =>{
        Question.find({
            userId: req.decoded.id
        })
        .populate('userId')
        .populate('answerId')
        .sort({ createdAt: "desc" })
        .then(response => {
            // console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(`fsdsfdsfs`,err);
            res.status(400).json({
                message: err.message
            });
        });
    },

    deleteById: (req, res) => {
        console.log(`control`);
        
        Question.deleteOne({
            _id: req.params.id, 
        })
        .then(response => {
           res.status(200).json(`succefully remove`)

        })
        .catch( err => {
            res.status(500).json(err)
        })
    },

    putById: (req, res) =>{
        console.log(req);
        
        Question.updateOne({
            _id: req.params.id 
        },{
            title: req.body.title,
            description: req.body.description
        })
        .then(response =>{
            res.status(201).json(`succesfully update`)
        })
        .catch( err => {
            res.status(500).json(err)
            console.log(`ini`,err);
        })
    },

    getOne: (req, res) =>{
        Question.findById({
            _id: req.params.id
        })
        .then(response =>{
            res.status(200).json(result)
        })
        .catch( err => {
            
            res.status(500).json(err)
        })
    },

    likers: (req, res) => {
        console.log(req.decoded.id);
        console.log(`ini params`,req.params.id);
        let id = req.params.id
        Question.updateOne({
            _id:id
        }, { 
            $push: { likes: req.decoded.id }, 
            $pull: { dislikes: req.decoded.id} 
        })
        .then( response => {
            console.log(`ini respo`,response);
            res.status(200).json({
                err: false,
                "message": "Success for vote a Question"
            })
        })
        .catch( err => {
            console.log(`vote eroor`);
            
            res.status(500).json({
                err: true,
                "message": err.message,
            })
        })  
    },

    unlikers: (req, res) => {
        let id = req.params.id
        Question.updateOne({
            _id:id
        }, { 
            $push: { dislikes: req.decoded.id }, 
            $pull: { likes: req.decoded.id } 
        })
        .then( response => {
            res.status(200).json({
                err: false,
                "message": "Success for unvote a Question"
            })
        })
        .catch( err => {
            res.status(500).json({
                err: true,
                "message": err.message,
            })
        })  
    },
}