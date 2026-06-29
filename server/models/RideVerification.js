const mongoose = require('mongoose')

const RideVerificationSchema = new mongoose.Schema(
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

module.exports = mongoose.models.RideVerification || mongoose.model('RideVerification', RideVerificationSchema)
