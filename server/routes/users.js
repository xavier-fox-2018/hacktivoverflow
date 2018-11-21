var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')

const multer = require('multer')
var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})
var upload = multer({ storage: storage })


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',upload.single('img'), userController.register)
router.post('/login', userController.login)

module.exports= router