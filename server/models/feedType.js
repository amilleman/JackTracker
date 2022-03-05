const mongoose = require('mongoose')

const feedTypeSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('FeedType', feedTypeSchema)