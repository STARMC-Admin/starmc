const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({ miles: { $gt: 0 } }).sort({ miles: -1 }).limit(20)

    const leaderboard = users.map(user => {
      let highestBadge = 'Rookie Rider'
      if (user.badges && user.badges.length > 0) {
        const badgePrecedence = [
          'Interstellar Legend',
          'Centurion Cruiser',
          'Iron Butt Elite',
          'Supernova',
          'Highway Star',
          'Road Warrior',
          'Asphalt Nomad',
          'Rookie Rider'
        ]
        const found = badgePrecedence.find(b => user.badges.includes(b))
        if (found) highestBadge = found
      }

      return {
        name: user.name,
        motorcycle: user.motorcycle,
        km: user.miles,
        rides: user.registeredRides ? user.registeredRides.length : 0,
        volunteering: Math.floor(user.miles / 2000) || 1,
        referrals: Math.floor(user.points / 1000) || 0,
        badge: highestBadge
      }
    })

    return res.json({ success: true, leaderboard })
  } catch (error) {
    next(error)
  }
})

module.exports = router
