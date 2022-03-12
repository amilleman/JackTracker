const mongoose = require('mongoose')

const medVitTypeSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('MedVitType', medVitTypeSchema)