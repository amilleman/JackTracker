const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  What: {
    type: String,
    required: true
  },
  When: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Event', eventSchema)