const express = require('express')
const router = express.Router()
// const path =  require('path')
const userController =  require('../controllers/users')

/*
  registration -  account creation
  authorisation -   login
  logout
  disable account

*/ 


router.get('/register', userController.registerUser) 

router.post('/login', userController.loginUser)




module.exports = router