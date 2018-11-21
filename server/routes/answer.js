const router = require("express").Router()
const Controller = require("../controllers/answerController")
const isLogin = require("../middleware/isLogin")
const authAnswer = require("../middleware/authAnswer")
const authVoteAnswer = require("../middleware/authVoteAnswer")

router
    .post("findOne/:id", isLogin, Controller.findOne)
    .post("/:id", isLogin, Controller.create)
    .post('/upvote/:id', isLogin, authVoteAnswer, Controller.upvote)
    .post('/downvote/:id', isLogin, authVoteAnswer, Controller.downvote)
    .put("/update/:id", isLogin, authAnswer, Controller.update)
    .delete("/remove/:id", isLogin, authAnswer, Controller.remove)

module.exports = router