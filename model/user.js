const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: {
    type: String,
    required: true
  },
  roles: {
    user: {
        type:Number,
        default: 2001
    },
    Editor: Number,  //1984
    Admin: Number //5150
  },
  refreshToken: String,
  creationDate: Date
});

// const User = mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema); //collection name: users -> (User)