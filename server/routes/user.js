const express = require("express"),
  routes = express.Router(),
  UserController = require("../controllers/user");

routes.get("/", UserController.findAll);
routes.get("/:id", UserController.findOne);
routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.post("/verify", UserController.verify);
routes.put("/:id", UserController.updateOne);
routes.delete("/:id", UserController.deleteOne);

module.exports = routes;