const mongoose = require('mongoose');

const dbCon = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_CONNECTION_URI}`)
    }catch(err){
        console.log('An error occured:' + err)
    }
}

module.exports = dbCon;
    