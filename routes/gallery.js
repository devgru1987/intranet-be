const express = require('express')
const router = express.Router()
const multer  = require('multer')
const { pictureStorage }  = require('../config/imageStorage')
const Picture = require('../model/picture')
const upload = multer({ storage: pictureStorage })

// define the home page route
router.post('/upload', upload.single('file'),  async (req, res) => {
  if(!req.file) res.status(400).json({"message":"No file submitted"})
  const {originalname, mimetype, filename, path, size} = req.file
  try {
    const newPicture = await Picture.create ({
    originalname,
    filename,
    path,
    size,
    isDeleted: false,
    creationDate: Date()
  })
  return res.status(200).json({"message": newPicture})
  }catch(err){
    console.log(`Error: ${err}`)
    return res.status(500).json({message: `Error: ${err}`})
  }
})

// define the about route
router.get('/fetchall', async (req, res) => {
  try{
    const pictures =  await Picture.find({isDeleted:false});
    if(pictures) return res.status(200).json({policies})
      /*what do we return if ther are no pictures*/ 
    // return res.status(400).json({})
  }catch(err){
    res.status(200).json({"message":`Error: ${err}`})
  }
})

module.exports = router