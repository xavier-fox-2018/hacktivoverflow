const Question = require('../models/questionModel.js');

function isAuthorizedPoster(req, res, next) {
    if (req.user) {
        try {
            Question.findById(req.params.id)
                .then(function(question) {
                    if (req.user._id.equals(question.poster)) {
                        next();
                    } else {
                        res.status(401).json({
                            message: 'You can only manage your own question'
                        });
                    }
                })
                .catch(function(err) {
                    console.log('Find Question Error isAuthorizedPoster: ', err);
                    res.status(500).json(err);
                });
        } catch(err) {
            res.status(500).json({
                error: err
            });
        }
    } else {
        res.status(400).json({
            message: 'Token not found'
        });
    }
}

module.exports = isAuthorizedPoster;