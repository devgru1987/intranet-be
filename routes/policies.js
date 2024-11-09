const express = require('express')
const router = express.Router()
const path =  require('path')

/*

- add policy
- delete policy

*/ 

// define the home page route
router.post('/upload', (req, res) => {
    console.log(req.body)
    res.send('Birds home page')
})

router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router