const router = require("express").Router()
const userRouter = require("./users")
const questionRouter = require("./question")
const answerRouter = require("./answer")

router
    .use('/users', userRouter)
    .use('/questions', questionRouter)
    .use('/answers', answerRouter)

module.exports = router