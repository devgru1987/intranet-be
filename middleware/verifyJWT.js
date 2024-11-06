require('dotenv').config()
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader =  req.headers['authorization']
    if(!authHeader) res.sendStatus(401) //unauthorized
    console.log(authHeader) 
    const token = authHeader.spli('')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if(err) res.sendStatus(403) //4bdn
            req.user = decoded.username
            next()
        }
    )
}

module.exports = verifyJWT