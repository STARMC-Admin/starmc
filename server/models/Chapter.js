const mongoose = require('mongoose')

const ChapterSchema = new mongoose.Schema({
  state: { type: String, required: true, unique: true },
  director: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  memberCount: { type: Number, default: 0 },
  establishedDate: { type: String, required: true },
})

module.exports = mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema)
