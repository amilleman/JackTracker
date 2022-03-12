const mongoose = require('mongoose')

const medVitSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: true
  },
  Amount: {
    type: Number,
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

module.exports = mongoose.model('MedVit', medVitSchema)