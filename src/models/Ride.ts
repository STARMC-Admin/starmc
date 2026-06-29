import mongoose, { Schema, Document, model, models } from 'mongoose'

export interface IRide extends Document {
  id: number
  title: string
  date: string
  location: string
  state: string
  difficulty: 'Easy' | 'Moderate' | 'Hard'
  distance: number
  duration: string
  rideCaptain: string
  adventure: boolean
  weekend: boolean
  description: string
  routeMapUrl: string
  schedule: { time: string; activity: string }[]
  meetingPoint: string
  fuelStops: string[]
  breakfastStop: string
  lunchStop: string
  emergencyContacts: string[]
  weather: string
  gallery: string[]
}

const RideSchema = new Schema<IRide>({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  state: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'], required: true },
  distance: { type: Number, required: true },
  duration: { type: String, required: true },
  rideCaptain: { type: String, required: true },
  adventure: { type: Boolean, default: false },
  weekend: { type: Boolean, default: false },
  description: { type: String, required: true },
  routeMapUrl: { type: String, required: true },
  schedule: [
    {
      time: { type: String, required: true },
      activity: { type: String, required: true },
    },
  ],
  meetingPoint: { type: String, required: true },
  fuelStops: [{ type: String }],
  breakfastStop: { type: String },
  lunchStop: { type: String },
  emergencyContacts: [{ type: String }],
  weather: { type: String },
  gallery: [{ type: String }],
})

const Ride = models.Ride || model<IRide>('Ride', RideSchema)
export default Ride
