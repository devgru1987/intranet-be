const mongoose = require('mongoose')
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: String,
  allday: Boolean,
  start: Date,
  end: Date,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  creationDate: Date
});

module.exports = mongoose.model('Event', eventSchema);