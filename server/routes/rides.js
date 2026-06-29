const express = require('express')
const router = express.Router()
const Ride = require('../models/Ride')
const User = require('../models/User')
const { authenticate, adminOnly } = require('../middleware/auth')

// Retrieve all rides
router.get('/', async (req, res, next) => {
  try {
    const rides = await Ride.find({}).sort({ date: 1 })
    return res.json({ success: true, rides })
  } catch (error) {
    next(error)
  }
})

// Create new ride (Admin only)
router.post('/', adminOnly, async (req, res, next) => {
  try {
    const maxRide = await Ride.findOne().sort({ id: -1 })
    const newId = maxRide ? maxRide.id + 1 : 1

    const newRide = await Ride.create({
      ...req.body,
      id: newId,
      routeMapUrl: `https://maps.google.com/?q=${encodeURIComponent(req.body.location)}`,
      weather: 'Clear sky (22°C to 28°C)',
      gallery: ['https://images.unsplash.com/photo-1558981852-78d19ab97382?auto=format&fit=crop&q=80&w=800']
    })

    return res.json({ success: true, ride: newRide })
  } catch (error) {
    next(error)
  }
})

// Register user for ride
router.post('/register', authenticate, async (req, res, next) => {
  try {
    const { rideId } = req.body
    if (!rideId) {
      return res.status(400).json({ error: 'Ride ID is required' })
    }

    const dbUser = await User.findById(req.user._id)
    if (!dbUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (dbUser.registeredRides.includes(rideId)) {
      return res.json({
        success: true,
        user: {
          name: dbUser.name,
          email: dbUser.email,
          membership: dbUser.membership,
          digitalCardId: dbUser.digitalCardId,
          points: dbUser.points,
          miles: dbUser.miles,
          badges: dbUser.badges,
          registeredRides: dbUser.registeredRides,
          achievements: dbUser.achievements,
          chapter: dbUser.chapter,
          motorcycle: dbUser.motorcycle,
          role: dbUser.role
        }
      })
    }

    dbUser.registeredRides.push(rideId)
    dbUser.points += 100
    dbUser.achievements.push('Registered for Upcoming Ride')

    await dbUser.save()

    return res.json({
      success: true,
      user: {
        name: dbUser.name,
        email: dbUser.email,
        membership: dbUser.membership,
        digitalCardId: dbUser.digitalCardId,
        points: dbUser.points,
        miles: dbUser.miles,
        badges: dbUser.badges,
        registeredRides: dbUser.registeredRides,
        achievements: dbUser.achievements,
        chapter: dbUser.chapter,
        motorcycle: dbUser.motorcycle,
        role: dbUser.role
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
