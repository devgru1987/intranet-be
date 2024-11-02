const path =  require('path')
const { logEvents } = require('./LogEvents')

const filePath =  path.join(__dirname, '..', 'logs', 'errorLogs.txt')

const errorHandler = (err, req, res, next) => {
    logEvents(err.message, filePath);
    console.log(err.stack) // logs tpo console
    res.status(500).send(err.message) // to thye browser
}


module.exports = { errorHandler }