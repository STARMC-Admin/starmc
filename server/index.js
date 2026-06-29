const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

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
app.use(cors({
  origin: true,
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

// Register routes
app.use('/api/seed', seedRouter)
app.use('/api/auth', authRouter)
app.use('/api/rides', ridesRouter)
app.use('/api/verify', verifyRouter)
app.use('/api/merchandise', merchandiseRouter)
app.use('/api/chapters', chaptersRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/user', userRouter)

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})
