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
      creationDate: Date()
    })
    return res.status(200).json({"message": newPolicyDocument})
  }catch(err){
    console.log(`Error: ${err}`)
    return res.status(500).json({message: `Error: ${err}`})
  }


    // console.log(req.body)
    // console.log(req.file) 
    res.send('Birds home page')

    /*
    {
      department: 'Finance'
      originalname: 'Paytronix_Incident Report - GMS USSD Monitoring.docx',
      destination: 'uploads/policies/',
      filename: '42b086b6585d402739bf5374b5921621',
      path: 'uploads\\policies\\42b086b6585d402739bf5374b5921621',
      size: 109138
    }
    */ 
})

router.get('/fetch', async (req, res) => {
  try{
    const policies =  await Policy.find({});
    if(policies) return res.status(200).json({"message": policies})
  }catch(err){
    res.status(200).json({"message":`Error: ${err}`})
  }
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router