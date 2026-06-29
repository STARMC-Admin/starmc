import mongoose, { Schema, Document, model, models } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  passwordHash: string
  role: 'USER' | 'ADMIN'
  membership: 'Standard' | 'Premium' | null
  digitalCardId: string
  points: number
  miles: number
  badges: string[]
  registeredRides: number[]
  achievements: string[]
  chapter: string
  motorcycle: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
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

const User = models.User || model<IUser>('User', UserSchema)
export default User
