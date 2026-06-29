const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, index: true },
  date: { type: String, required: true },
  items: { type: String, required: true },
  total: { type: mongoose.Schema.Types.Mixed, required: true },
  status: { type: String, required: true },
})

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema)
