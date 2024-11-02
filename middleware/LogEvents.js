
const { compareAsc, format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');
const fsPromises = require('node:fs/promises'); //Promises API
const { existsSync } = require('node:fs')
const path =  require('path')


const logDirectoryPath =  path.join(__dirname, '..', 'logs')

const logEvents = async (message, filePath) => {
    const date = format(new Date(), 'dd-MMM-yyy\tHH:mm:ss')
    const logItem = `${date}\t${uuidv4()}\t${message}\n`
    try {
        if(!existsSync(logDirectoryPath)){
             await fsPromises. mkdir(logDirectoryPath, {recursive: true}, err => {
           })
        }
        const writeResponse = await fsPromises.appendFile(filePath, logItem)
    }catch (err){
        console.log(`An error occured: ${err}`) // proper error handling to be implemenetdd
    }
}


const logger = (req, res, next) => {
    const filePath =  path.join(__dirname, '..', 'logs', 'eventLogs.txt')
    const message = `${req.method}\t${req.headers.origin}\t${req.url}`
    logEvents(message, filePath)
    next()
}

module.exports = { logEvents, logger }