const path = require('path');
const express = require("express");
const multer = require('multer');
const docRouter = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
});

function checkFileType(file, cb) {
  const filetypes = /doc|docx|xls|xlsx|pdf|html/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Documents only!!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

// docRouter.post('/', upload.single('file'), (req, res) => {
//   console.log(`/${req.file.path}`);
//   res.send(`/${req.file.path}`);
// })

module.exports = {
  upload,
  storage
}