const express = require('express')
const router = express.Router()
const RideVerification = require('../models/RideVerification')
const User = require('../models/User')
const { authenticate, adminOnly } = require('../middleware/auth')

// Get verifications (Admin only)
router.get('/', adminOnly, async (req, res, next) => {
  try {
    const verifications = await RideVerification.find({}).sort({ createdAt: -1 })
    return res.json({ success: true, verifications })
  } catch (error) {
    next(error)
  }
})

// Submit verification proof
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { rideTitle, distance, proofUrl } = req.body
    if (!rideTitle || !distance) {
      return res.status(400).json({ error: 'Ride title and distance are required' })
    }

    const newVerification = await RideVerification.create({
      id: Date.now(),
      userName: req.user.name,
      userEmail: req.user.email,
      rideTitle,
      date: new Date().toISOString().split('T')[0],
      distance,
      proofUrl: proofUrl || 'Odometer scan showing completion of ride route.',
      status: 'Pending'
    })

    return res.json({ success: true, verification: newVerification })
  } catch (error) {
    next(error)
  }
})

// Update status (Admin only)
router.put('/', adminOnly, async (req, res, next) => {
  try {
    const { id, status } = req.body
    if (!id || !status || !['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Valid ID and status are required' })
    }

    const verification = await RideVerification.findOne({ id })
    if (!verification) {
      return res.status(404).json({ error: 'Verification request not found' })
    }

    verification.status = status
    await verification.save()

    if (status === 'Approved') {
      const dbUser = await User.findOne({ email: verification.userEmail })
      if (dbUser) {
        dbUser.miles += verification.distance
        dbUser.points += Math.floor(verification.distance * 0.5)

        const milestones = [
          { km: 500, badge: 'Asphalt Nomad' },
          { km: 1000, badge: 'Road Warrior' },
          { km: 2500, badge: 'Highway Star' },
          { km: 5000, badge: 'Supernova' },
          { km: 10000, badge: 'Iron Butt Elite' },
          { km: 25000, badge: 'Interstellar Legend' },
          { km: 50000, badge: 'Centurion Cruiser' }
        ]

        milestones.forEach(m => {
          if (dbUser.miles >= m.km && !dbUser.badges.includes(m.badge)) {
            dbUser.badges.push(m.badge)
            dbUser.achievements.push(`Earned ${m.badge} Badge (${m.km} KM)`)
          }
        })

        await dbUser.save()
      }
    }

    return res.json({ success: true, verification })
  } catch (error) {
    next(error)
  }
})

module.exports = router
