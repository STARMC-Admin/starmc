const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    membership: { type: String, enum: ['Standard', 'Premium', null], default: null },
    digitalCardId: { type: String, unique: true },
    points: { type: Number, default: 0 },
    miles: { type: Number, default: 0 },
    badges: [{ type: String }],
    registeredRides: [{ type: Number }],
    achievements: [{ type: String }],
    chapter: { type: String, required: true },
    motorcycle: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
