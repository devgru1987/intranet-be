const mongoose = require('mongoose')
const { Schema } = mongoose;

const pictureSchema = new Schema({
  originalname: String,
  filename: String,
  path: String,
  size: Number,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  creationDate: Date
});

module.exports = mongoose.model('Picture', pictureSchema); //collection name: users -> (User)


/*
 originalname: 'IT distribution list.png',
      mimetype: 'image/png',
      filename: '1731757877758-IT distribution list.png',
      path: 'public\\uploads\\gallery\\1731757877758-IT distribution list.png',
      size: 18344

*/ 