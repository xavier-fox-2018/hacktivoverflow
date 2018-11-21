const router = require("express").Router()
const Controller = require("../controllers/userController")
const isLogin  = require("../middleware/isLogin")

router
    .post("/signup", Controller.signup)
    .post("/signin", Controller.signin)
    .post("/signinGoogle", Controller.signinGoogle)
    .put("/update", isLogin, Controller.update)
    
module.exports = router