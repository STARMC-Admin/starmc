import mongoose, { Schema, Document, model, models } from 'mongoose'

export interface IRideVerification extends Document {
  id: number
  userName: string
  userEmail: string
  rideTitle: string
  date: string
  distance: number
  proofUrl: string
  status: 'Pending' | 'Approved' | 'Rejected'
  createdAt: Date
}

const RideVerificationSchema = new Schema<IRideVerification>(
  {
    id: { type: Number, required: true, unique: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, index: true },
    rideTitle: { type: String, required: true },
    date: { type: String, required: true },
    distance: { type: Number, required: true },
    proofUrl: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  },
  { timestamps: true }
)

const RideVerification = models.RideVerification || model<IRideVerification>('RideVerification', RideVerificationSchema)
export default RideVerification
