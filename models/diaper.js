const mongoose = require('mongoose')

const diaperSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: true
  },
  CreatedModifiedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  Details: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Diaper', diaperSchema)