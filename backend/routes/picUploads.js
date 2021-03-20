const path = require('path');
const express = require("express");
const multer = require('multer');
const imageRouter = express.Router()
const body = require('body-parser');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../uploads')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  })
  
  imageRouter.post('/', (req, res) => {
    console.log(11);
    res.send(req.body.name)
    console.log(req.body);
  })
  


  
  module.exports =  imageRouter;