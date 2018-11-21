const Question = require('../models/question.js');

class QuestionController {

    static create(req, res) {
        Question.create({
            title: req.body.title,
            content: req.body.content,
        })
            .then(function(resolve) {
                res.status(201).json(resolve);
            })
            .catch(function(reject) {
                res.status(500).json(reject);
            });
    }

    static read(req, res) {
        Question.find()
            .then(function(resolve) {
                res.status(201).json(resolve);
            })
            .catch(function(reject) {
                res.status(500).json(reject);
            });
}

    static update(req, res) {
        Question.findByIdAndUpdate(req.params.QuestionId,
            {
                title: req.body.title,
                content: req.body.content,
            }
        )
            .then(resolve => {
                res.status(201).json(resolve);
            })
            .catch(reject => {
                res.status(500).json(reject);
            });
    }

    static delete(req, res) {
        Question.deleteOne({
            _id: req.params.QuestionId
        })
            .then(resolve => {
                res.status(201).json(resolve);
            })
            .catch(reject => {
                res.status(500).json(reject);
            });
    }

    static getOne(req, res) {
        Question.findById(req.params.QuestionId)
            .then(resolve => {
                res.status(201).json(resolve);
            })
            .catch(reject => {
                res.status(500).json(reject);
            });
    }

}

module.exports = QuestionController;