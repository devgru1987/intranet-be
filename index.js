require('dotenv').config()
const express =  require('express')
const EventEmitter = require('node:events');
const path =  require('path')
const cors = require('cors')
const corsOptions =  require('./config/corsOprions')
const { logger, logEvents } =  require('./middleware/LogEvents')
const { errorHandler } = require('./middleware/errorHandler');
const mongoose =  require('mongoose')
const dbCon = require('./config/dbCon')
// const verifyJWT = require('./middleware/verifyJWT');
const app =  express();
const PORT = process.env.PORT || 3001
   
/* custom middleware*/
app.use(logger) 
app.use(cors(corsOptions))

/* apply middleware with app.use */
app.use(express.urlencoded({extended: true})) /* urlencoded is form data*/
app.use(express.json()) /* handle json data*/
app.use(express.static(path.join(__dirname, '/public'))) /* sets folder accesbile by the public */

dbCon()

/* routers */
app.use('/users', require('./routes/users'))
// app.use(verifyJWT) 
app.use('/policies', require('./routes/policies'))
app.use('/gallery', require('./routes/gallery'))
app.use('/events', require('./routes/events'))

/* catch all */ 
app.all('*', (req, res) => { res.status(404).json({ message: 'Page not found'}) })

 /* error handler logger */
app.use(errorHandler)

mongoose.connection.once('connected', () => {
    app.listen(PORT, () => { console.log(`intranet running on port: ${PORT}`) })
});







//const myEmitter = new EventEmitter();

// Log an evenyt
//myEmitter.on('logEvent', (msg) =>  logEvents(msg));

// myEmitter.emit('event', 1, 2, 3, 4, 5);
//myEmitter.emit('logEvent', 'Juma has deleted a file')


