'use strict'
const express = require('express'),
      router = express.Router()

/* GET main endpoint. */
router.get('/', (req, res, next) => {
  res.send({
		status: 'success',
		message: 'client is connected to the server'
	})
})

// router.post('/upload',
  // images.multer.single('image'), 
  // images.sendUploadToGCS,
  // (req, res) => {
    // res.send({
      // status: 200,
      // message: 'Your file is successfully uploaded',
      // link: req.file.cloudStoragePublicUrl
    // })
  // })

module.exports = router
