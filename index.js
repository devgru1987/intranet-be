require('dotenv').config()
const express =  require('express')
const EventEmitter = require('node:events');
const path =  require('path')
const cors = require('cors')
const { logger, logEvents } =  require('./middleware/LogEvents')
const { errorHandler } = require('./middleware/errorHandler')
const app =  express();
const PORT = process.env.PORT || 3001

const allowedList = [
    'https://www.google.com', 
    'http:localhost:3001', 
    'http:127.0.0.1:3001',
    'http:localhost:3000', 
    'http:127.0.0.1:3000'
]  /*leave only acceptebale front end url here*/

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedList.indexOf(origin) !== -1 || !origin ) { /* delete the !origin after dev*/
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatus:200
}
   
/* custom middleware*/
app.use(logger) 
app.use(cors(corsOptions))

/* apply middleware with app.use */
app.use(express.urlencoded({extended: true})) /* urlencoded is form data*/
app.use(express.json()) /* handle json data*/
app.use(express.static(path.join(__dirname, '/public'))) /* sets folder accesbile by the public */

app.get('/', (req, res) => {
    console.log('index page requested')
})


app.all('*', (req, res) => {
    res.status('404').json({ message: 'Page not found'})
})

app.use(errorHandler) // error handler logger
app.listen(PORT, () => { console.log(`Example app listening on port ${PORT}`) })







//const myEmitter = new EventEmitter();

// Log an evenyt
//myEmitter.on('logEvent', (msg) =>  logEvents(msg));

// myEmitter.emit('event', 1, 2, 3, 4, 5);
//myEmitter.emit('logEvent', 'Juma has deleted a file')


