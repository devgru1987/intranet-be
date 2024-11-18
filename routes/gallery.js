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
    return res.status(500).json({message: `Error: ${err}`})
  }
})

router.get('/fetch/pictures', async (req, res) => {
  try{
    const pictures =  await Picture.find({isDeleted:false});
    if(pictures) return res.status(200).json({pictures})
      /*what do we return if ther are no pictures*/ 
    // return res.status(400).json({})
  }catch(err){
    res.status(200).json({"message":`Error: ${err}`})
  }
})

router.delete('/delete/:id', async (req, res) => {
  if(!req.params.id) return res.status(400).json({"message":"Bad request"})
  const id = req.params.id
  try{
    const deletedPicture = await Picture.deleteOne({ _id: id})
    if(!deletedPicture) res.status(500).json({"message": "internal server error"}) /*revise it to checkk before deleting*/
    return res.status(200).json({deletedPicture})
  }catch(err){
    return res.status(500).json({"message": "Internal server error"})
  }
})

module.exports = router