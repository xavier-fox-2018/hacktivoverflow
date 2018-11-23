const express = require("express"),
  routes = express.Router(),
  AnswerController = require("../controllers/answer");
  authorize = require('../middlewares/authorize.js')

routes.post("/", authorize, AnswerController.create);
routes.delete("/:answerId", authorize, AnswerController.delete);
routes.post("/upvote/:answerId", authorize, AnswerController.upvote);
routes.post("/downvote/:answerId", authorize, AnswerController.downvote);

module.exports = routes;
