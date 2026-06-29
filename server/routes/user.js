const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { authenticate } = require('../middleware/auth')

// Buy membership
router.post('/membership', authenticate, async (req, res, next) => {
  try {
    const { type } = req.body
    if (!type || !['Standard', 'Premium'].includes(type)) {
      return res.status(400).json({ error: 'Invalid membership type' })
    }

    const dbUser = await User.findById(req.user._id)
    if (!dbUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    dbUser.membership = type
    dbUser.points += (type === 'Premium' ? 500 : 250)
    dbUser.achievements.push(`${type} Membership Activated`)

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
