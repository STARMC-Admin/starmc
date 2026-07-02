const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const rateLimit = require('express-rate-limit')

// Load environment variables from parent folder .env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const DB_URI = process.env.DB_URI ? process.env.DB_URI.trim() : undefined
const PORT = process.env.PORT || 5000

if (!DB_URI) {
  console.error('Error: DB_URI is not defined in the environment variables')
  process.exit(1)
}

const app = express()

// Middleware
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://starmc-ctwk.onrender.com']
  : ['http://localhost:3000', 'http://localhost:3001']

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Connect to MongoDB
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Successfully connected to MongoDB Atlas'))
.catch(err => {
  console.error('MongoDB connection error:', err)
  process.exit(1)
})

// Define Router requires
const seedRouter = require('./routes/seed')
const authRouter = require('./routes/auth')
const ridesRouter = require('./routes/rides')
const verifyRouter = require('./routes/verify')
const merchandiseRouter = require('./routes/merchandise')
const chaptersRouter = require('./routes/chapters')
const leaderboardRouter = require('./routes/leaderboard')
const userRouter = require('./routes/user')

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 requests per window
  message: { error: 'Too many authentication attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
})

// Register routes
app.get('/', (req, res) => {
  res.json({ success: true, message: 'STARMC API is running smoothly' })
})
app.use('/api/seed', seedRouter)
app.use('/api/auth', authLimiter, authRouter)
app.use('/api/rides', ridesRouter)
app.use('/api/verify', verifyRouter)
app.use('/api/merchandise', merchandiseRouter)
app.use('/api/chapters', chaptersRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/user', userRouter)

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  const isProduction = process.env.NODE_ENV === 'production'
  const message = isProduction ? 'Internal Server Error' : (err.message || 'Internal Server Error')
  res.status(500).json({ success: false, error: message })
})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})
