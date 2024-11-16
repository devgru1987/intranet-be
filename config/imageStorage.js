const multer  = require('multer')

const pictureStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/gallery')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null,  `${uniqueSuffix}-${file.originalname}`)
    }
  })


  module.exports = {
    pictureStorage
  }