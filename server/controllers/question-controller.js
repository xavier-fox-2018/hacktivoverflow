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
        let id = req.params.id
        Question.updateOne({
            _id:id
        }, { 
            $push: { likes: req.decoded.id }, 
            $pull: { dislikes: req.decoded.id} 
        })
        .then( response => {
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

    // likers: (req, res) => {
    //     let id = req.params.id
    //     let userId = req.decoded.id
    //     Question.findOne({
    //         _id:id,
    //     })
    //     .then( response => {
    //         let likes = response.likes
    //         let found = likes.findIndex(like => like == userId)
    //         if(found == - 1){
    //             Question.updateOne({
    //                 _id:id
    //             }, { 
    //                 $push: { likes: req.decoded.id }, 
    //                 $pull: { dislikes: req.decoded.id} 
    //             })
    //             .then(response =>{
    //                 console.log(response);
    //             })
    //             .catch(err =>{
    //                 console.log(err);
    //             })
    //         } else {
    //             Question.updateOne({
    //                 _id:id
    //             }, { 
    //                 $pull: { likes: req.decoded.id} ,
    //             })
    //             .then(response =>{
    //                 console.log(response);
    //             })
    //             .catch(err =>{
    //                 console.log(err);
    //             })
    //         } 
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //     })
    // },

    // unlikers: (req, res) => {
    //     let id = req.params.id
    //     let userId = req.decoded.id
    //     Question.findOne({
    //         _id:id,
    //     })
    //     .then( response => {
    //         let dislikes = response.dislikes
    //         let found = dislikes.findIndex(like => like == userId)
    //         if(found == - 1){
    //             Question.updateOne({
    //                 _id:id
    //             }, { 
    //                 $push: { dislikes: req.decoded.id} ,
    //                 $pull: { likes: req.decoded.id }, 
    //             })
    //             .then(response =>{
    //                 console.log(response);
    //             })
    //             .catch(err =>{
    //                 console.log(err);
    //             })
    //         } else {
    //             Question.updateOne({
    //                 _id:id
    //             }, { 
    //                 $pull: { dislikes: req.decoded.id} ,
    //             })
    //             .then(response =>{
    //                 console.log(response);
    //             })
    //             .catch(err =>{
    //                 console.log(err);
    //             })
    //         } 
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //     })
    // },




}