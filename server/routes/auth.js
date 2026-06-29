const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Order = require('../models/Order')
const { signToken, getAuthenticatedUser } = require('../middleware/auth')

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, motorcycle, chapter } = req.body

    if (!name || !email || !password || !motorcycle || !chapter) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const digitalCardId = `STAR-IND-${Math.floor(1000 + Math.random() * 9000)}`

    const newUser = await User.create({
      name,
      email,
      passwordHash,
      role: 'USER',
      membership: null,
      digitalCardId,
      points: 200,
      miles: 0,
      badges: ['Rookie Rider'],
      registeredRides: [],
      achievements: ['Joined the Brotherhood'],
      chapter,
      motorcycle
    })

    const token = signToken({ email: newUser.email, role: newUser.role })

    res.cookie('starmc_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      path: '/'
    })

    return res.json({
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        membership: newUser.membership,
        digitalCardId: newUser.digitalCardId,
        points: newUser.points,
        miles: newUser.miles,
        badges: newUser.badges,
        registeredRides: newUser.registeredRides,
        orders: [],
        achievements: newUser.achievements,
        chapter: newUser.chapter,
        motorcycle: newUser.motorcycle,
        role: newUser.role
      }
    })
  } catch (error) {
    next(error)
  }
})

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    // Fetch user's orders
    const orders = await Order.find({ userEmail: user.email }).sort({ date: -1 })

    const token = signToken({ email: user.email, role: user.role })

    res.cookie('starmc_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    })

    return res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        membership: user.membership,
        digitalCardId: user.digitalCardId,
        points: user.points,
        miles: user.miles,
        badges: user.badges,
        registeredRides: user.registeredRides,
        orders: orders,
        achievements: user.achievements,
        chapter: user.chapter,
        motorcycle: user.motorcycle,
        role: user.role
      }
    })
  } catch (error) {
    next(error)
  }
})

// Logout
router.post('/logout', (req, res) => {
  res.cookie('starmc_token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/'
  })
  return res.json({ success: true, message: 'Logged out successfully' })
})

// Me
router.get('/me', async (req, res, next) => {
  try {
    const user = await getAuthenticatedUser(req)

    if (!user) {
      return res.json({ success: true, user: null })
    }

    const orders = await Order.find({ userEmail: user.email }).sort({ date: -1 })

    return res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        membership: user.membership,
        digitalCardId: user.digitalCardId,
        points: user.points,
        miles: user.miles,
        badges: user.badges,
        registeredRides: user.registeredRides,
        orders: orders,
        achievements: user.achievements,
        chapter: user.chapter,
        motorcycle: user.motorcycle,
        role: user.role
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
