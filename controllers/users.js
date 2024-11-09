require('dotenv').config()
const bcrypt =  require('bcrypt');
const jwt =  require('jsonwebtoken')
const User =  require('../model/user')

const registerUser = async (req, res) => {
    const saltRounds = 10
    const { username, password } = req.body
    if(!username || !password) res.status(400).json({message: "Username and password are required"})  //400 -  bad request
    try{
        const duplicate =  await User.findOne({username}).exec()
        if(duplicate) return res.status(409).json({message: `username ${duplicate.username} is already taken`}) //409 -  conflict
        const passwordHash =  await bcrypt.hash(password, saltRounds)
        const newUser = await User.create({
            username,
            password: passwordHash
        })
        return res.status(200).json({"message": newUser})
    }catch(err) {
        return res.status(500).json({message: `Error: ${err}`})
    }
}

const loginUser = async (req, res) => {
    const [username, password] = req.body
    if(!username || !password) res.status(400).json({message: 'Username & Password are required'})
    try {
        const foundUser =  ''//add login to find user
        if(!foundUser) res.status(401).json({message: 'Unauthorised user'})
        const match =  bcrypt.compare(password, foundUser.password)
        if(match) {

            const accessToken = jwt.sign(
                { username: foundUser.username }, 
                process.env.ACCESS_TOKEN,
                {expriesIn:'1m'} //30s, 1d
            );

            const refreshToken = jwt.sign(
                { username: foundUser.username }, 
                process.env.REFRESH_TOKEN,
                {expriesIn:'1d'} //30s, 1d
            );


            res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000}) // maxAge= milliseconds that last a day
            res.status(200).json({accessToken}) // send back the accesstoken
        }else{
            res.status(401).json({message: 'Unauthorised user'})
        }
    }catch(err) {
        res.status(500).json({message: `Inetrnal server error. Please try again later\t${err.message}`})
    }
}

module.exports = {
    registerUser,
    loginUser
}