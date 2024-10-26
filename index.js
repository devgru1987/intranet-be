
const EventEmitter = require('node:events');
const myEmitter = new EventEmitter();
const logEvents =  require('./utils/LogEvents')

// Log an evenyt
myEmitter.on('logEvent', (msg) =>  logEvents(msg));

// myEmitter.emit('event', 1, 2, 3, 4, 5);
myEmitter.emit('logEvent', 'Juma has deleted a file')
