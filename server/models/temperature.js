const mongoose = require('mongoose')

const temperatureSchema = new mongoose.Schema({
  Temperature: {
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

module.exports = mongoose.model('Temperature', temperatureSchema)