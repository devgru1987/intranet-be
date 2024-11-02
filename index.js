require('dotenv').config()
const express =  require('express')
const EventEmitter = require('node:events');
const logEvents =  require('./utils/LogEvents')
const app =  express();
const PORT = process.env.PORT || 3001


/* apply middleware with app.use */
app.use(express.urlencoded({extended: true})) /* urlencoded is form data*/
app.use(express.json()) /* handle json data*/
app.use(express.static(path.join(__dirname, '/public'))) /* sets folder accesbile by the public */





app.listen(PORT, () => { console.log(`Example app listening on port ${PORT}`) })

//const myEmitter = new EventEmitter();

// Log an evenyt
//myEmitter.on('logEvent', (msg) =>  logEvents(msg));

// myEmitter.emit('event', 1, 2, 3, 4, 5);
//myEmitter.emit('logEvent', 'Juma has deleted a file')


