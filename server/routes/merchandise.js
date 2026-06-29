const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Order = require('../models/Order')
const User = require('../models/User')
const { authenticate } = require('../middleware/auth')

// Get products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find({})
    return res.json({ success: true, products })
  } catch (error) {
    next(error)
  }
})

// Place order or claim reward
router.post('/order', authenticate, async (req, res, next) => {
  try {
    const { items, total, isReward, pointsCost, rewardName, status } = req.body

    const dbUser = await User.findById(req.user._id)
    if (!dbUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    const orderId = `${isReward ? 'REW' : 'ORD'}-${Math.floor(1000 + Math.random() * 9000)}`

    if (isReward) {
      if (dbUser.points < pointsCost) {
        return res.status(400).json({ error: 'Insufficient points' })
      }
      dbUser.points -= pointsCost
      dbUser.achievements.push(`Claimed Reward: ${rewardName}`)
    } else {
      const pointsEarned = Math.floor(Number(total) / 10)
      dbUser.points += pointsEarned
      dbUser.achievements.push('Placed Merchandise Order')
    }

    const newOrder = await Order.create({
      id: orderId,
      userEmail: req.user.email,
      date: new Date().toISOString().split('T')[0],
      items,
      total,
      status: status || (isReward ? 'Claimed / Shipping' : 'Processing')
    })

    await dbUser.save()

    const orders = await Order.find({ userEmail: req.user.email }).sort({ date: -1 })

    return res.json({
      success: true,
      order: newOrder,
      user: {
        name: dbUser.name,
        email: dbUser.email,
        membership: dbUser.membership,
        digitalCardId: dbUser.digitalCardId,
        points: dbUser.points,
        miles: dbUser.miles,
        badges: dbUser.badges,
        registeredRides: dbUser.registeredRides,
        orders: orders,
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
