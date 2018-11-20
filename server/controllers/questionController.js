const Question = require('../models/questions')

class Controller {
    static create(req, res) {
        
        if ((!req.body.title && !req.body.description) || (req.body.title.length === 0 && req.body.description.length === 0)) {
            res.status(500).json({
                message: 'question need description and title'
            })
        } else if (!req.body.title || req.body.title.length === 0) {
            res.status(500).json({
                message: 'question need title'
            })
        } else if (!req.body.description || req.body.description.length === 0) {
            res.status(500).json({
                message: 'question need description'
            })
        } else {
            Question.create({
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                author: req.userData._id //ini diambil dari hasil cek token di middleware
            })
            .then((result) => {
                res.status(201).json({
                    message: 'create Question success',
                    created: result
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'create Question failed'
                })
            })
        }
    }

    static read(req, res) {
        Question.find()
            .populate('category')
            .populate('author')
            .populate('answers')
            .then((result) => {
                res.status(201).json({
                    data: result
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'read Question failed'
                })
            })
    }

    static readOne(req, res) {
        Question.findById(req.params.id)
            .populate('category')
            .populate('author')
            .populate({
                path: "answers",
                populate: {
                    path: "author"
                }
            })
            .then((result) => {
                res.status(200).json({
                    data: result
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'cant find question'
                })
            })
    }

    static search(req, res) {
        Question.find({
                title: new RegExp(req.query.keyword, 'i')
            }, null, {
                sort: {
                    title: 'ASC'
                }
            })
            .populate('author')
            .then(data => {
                res.status(200).json({
                    data: data
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                })
            })
    }

    static my(req, res) {
        Question.find({
                author: req.userData._id
            })
            .then((result) => {
                // console.log('result in server',result)
                res.status(201).json({
                    message: 'get my Question success',
                    data: result
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: 'get my Question failed'
                })
            })
    }

    static delete(req, res) {
        
        Question.findByIdAndRemove(req.params.id)
            .then((deleted) => {
                res.status(200).json({
                    message: 'Question deleted successfully'
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Delete Question failed'
                })
            })
    }

    static byCategory(req, res) {
        Question.find({
                category: req.params.id
            })
            .populate('author')
            .then((result) => {
                res.status(201).json({
                    data: result
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: 'get question by category failed'
                })
            })
    }


    static update(req, res) {
        if ((!req.body.title && !req.body.description) || (req.body.title.length === 0 && req.body.description.length === 0)) {
            res.status(500).json({
                message: 'An Question need a content and title'
            })
        } else if (!req.body.title || req.body.title.length === 0) {
            res.status(500).json({
                message: 'An Question need to be titled'
            })
        } else if (!req.body.description || req.body.description.length === 0) {
            res.status(500).json({
                message: 'An article need a content'
            })
        } else {
            Question.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    title: req.body.title,
                    description: req.body.description,
                    category: req.body.category,
                    author: req.userData._id
                })
                .then((change) => {
                    res.status(201).json({
                        message: 'update success',
                        updated: change
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: 'update failed'
                    })
                })
        }
    }

}

module.exports = Controller;