const express = require('express')
const router = express.Router()
const multer  = require('multer')
// const policyStorage = require('../middleware/PolicyStorage')
const upload = multer({ dest: 'public/uploads/policies' })
const Policy = require('../model/policy')


/*
- add policy
- delete policy
*/ 

router.post('/upload', upload.single('file'), async (req, res) => {
  if(!req.body || !req.file) return res.status(400).json({"message": "Please fill in the department and select a policy document to be uploaded"})
    // console.log(req.file)
  const { originalname, destination, filename, path, size } =  req.file
  const { department } =  req.body
     
  try {
    const newPolicyDocument = await Policy.create ({
      department,
      originalname,
      destination,
      filename,
      path,
      size,
      isDeleted: false,
      creationDate: Date()
    })
    return res.status(200).json({"message": newPolicyDocument})
  }catch(err){
    console.log(`Error: ${err}`)
    return res.status(500).json({message: `Error: ${err}`})
  }
})

router.get('/fetch', async (req, res) => {
  try{
    const policies =  await Policy.find({isDeleted:false});
    if(policies) return res.status(200).json({policies})
  }catch(err){
    res.status(200).json({"message":`Error: ${err}`})
  }
})
// define the about route
router.delete('/delete/:id', async (req, res) => {
  if(!req.params.id) return res.status(400).json({"message": "Invalid request format. Please check the data and try again"})
  const id = req.params.id
  try {
    /*do delete an item, we mark its isDeleted key as true*/ 
    const deletedItem = await Policy.findOneAndUpdate({_id:id}, {isDeleted: true}) 
    if(!deletedItem) return res.status(404).json({"message": "COuld not find file to delete"})
    return res.status(200).json({"message": deletedItem})
  }catch(err){
    res.status(500).json({"message": `Internal server error: ${err.message}`})
  }
})

module.exports = router