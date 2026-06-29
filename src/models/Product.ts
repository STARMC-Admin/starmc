import mongoose, { Schema, Document, model, models } from 'mongoose'

export interface IProduct extends Document {
  id: number
  title: string
  category: string
  price: number
  rating: number
  reviews: { author: string; comment: string; rating: number }[]
  image: string
  description: string
  inStock: boolean
}

const ProductSchema = new Schema<IProduct>({
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

const Product = models.Product || model<IProduct>('Product', ProductSchema)
export default Product
