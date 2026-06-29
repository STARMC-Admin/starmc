const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-starmc'

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (e) {
    return null
  }
}

async function getAuthenticatedUser(req) {
  const token = req.cookies.starmc_token
  if (!token) return null

  const decoded = verifyToken(token)
  if (!decoded) return null

  const user = await User.findOne({ email: decoded.email }).select('-passwordHash')
  return user
}

async function authenticate(req, res, next) {
  try {
    const user = await getAuthenticatedUser(req)
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    req.user = user
    next()
  } catch (e) {
    next(e)
  }
}

async function adminOnly(req, res, next) {
  try {
    const user = await getAuthenticatedUser(req)
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized' })
    }
    req.user = user
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  signToken,
  verifyToken,
  authenticate,
  adminOnly,
  getAuthenticatedUser
}
