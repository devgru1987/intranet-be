import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: {
    tyep: String,
    required: true
  },
  roles: {
    user: {
        type:Number,
        default: 2001
    },
    Editor: Number,
    Admin: Number
  },
  refreshToken: String,
  creationDate: Date
});

// const User = mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema); //collection name: users -> (User)