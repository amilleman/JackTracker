const mongoose = require('mongoose')

const sleepSchema = new mongoose.Schema({
  Length: {
    type: Number,
    required: false
  },
  EndedAt: {
    type: Date,
    required: false
  },
  StartedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  Details: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Sleep', sleepSchema)