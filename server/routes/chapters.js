const express = require('express')
const router = express.Router()
const Chapter = require('../models/Chapter')

router.get('/', async (req, res, next) => {
  try {
    const chapters = await Chapter.find({}).sort({ memberCount: -1 })
    return res.json({ success: true, chapters })
  } catch (error) {
    next(error)
  }
})

module.exports = router
