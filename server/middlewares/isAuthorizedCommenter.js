const Answer = require('../models/answerModel.js');

function isAuthorizedCommenter(req, res, next) {
    if (req.user) {
        try {
            Answer.findById(req.body.id)
                .then(function(answer) {
                    if (req.user._id.equals(answer.user)) {
                        next();
                    } else {
                        res.status(401).json({
                            message: 'You can only manage your own answer'
                        });
                    }
                })
                .catch(function(err) {
                    console.log('Find Answer Error isAuthorizedCommenter: ', err);
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

module.exports = isAuthorizedCommenter;