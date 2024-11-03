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

module.exports = corsOptions;