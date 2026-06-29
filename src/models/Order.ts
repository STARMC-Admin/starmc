import mongoose, { Schema, Document, model, models } from 'mongoose'

export interface IOrder extends Document {
  id: string
  userEmail: string
  date: string
  items: string
  total: number | string
  status: string
}

const OrderSchema = new Schema<IOrder>({
  id: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, index: true },
  date: { type: String, required: true },
  items: { type: String, required: true },
  total: { type: Schema.Types.Mixed, required: true },
  status: { type: String, required: true },
})

const Order = models.Order || model<IOrder>('Order', OrderSchema)
export default Order
