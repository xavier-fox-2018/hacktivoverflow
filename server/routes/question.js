const express = require("express"),
  routes = express.Router(),
  QuestionController = require("../controllers/question");
  authorize = require('../middlewares/authorize.js')

routes.get("/", QuestionController.findAll);
routes.get("/:questionId", QuestionController.findOne);
routes.post("/", authorize, QuestionController.create);

module.exports = routes;
