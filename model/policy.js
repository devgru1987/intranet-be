const mongoose = require('mongoose')
const { Schema } = mongoose;

const policySchema = new Schema({
  department: String,
  originalname: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  creationDate: Date
});

module.exports = mongoose.model('Policy', policySchema); //collection name: users -> (User)




// {
//     department: 'Finance'
//     originalname: 'Paytronix_Incident Report - GMS USSD Monitoring.docx',
//     destination: 'uploads/policies/',
//     filename: '42b086b6585d402739bf5374b5921621',
//     path: 'uploads\\policies\\42b086b6585d402739bf5374b5921621',
//     size: 109138
//   }