const mongoose = require('mongoose')

const activitiesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  imageURL: String,
  textArea: { type: String, required: true }
})

const Activities = mongoose.model('Activities', activitiesSchema)

module.exports = Activities
