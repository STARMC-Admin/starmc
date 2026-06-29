const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 5 },
  reviews: [
    {
      author: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  ],
  image: { type: String, required: true },
  description: { type: String, required: true },
  inStock: { type: Boolean, default: true },
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)
