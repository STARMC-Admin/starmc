import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import dbConnect from './mongodb'
import User from '@/models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-starmc'

export function signToken(payload: { email: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; role: string }
  } catch (e) {
    return null
  }
}

export async function getAuthenticatedUser() {
  const cookieStore = cookies()
  const token = cookieStore.get('starmc_token')?.value

  if (!token) return null

  const decoded = verifyToken(token)
  if (!decoded) return null

  await dbConnect()
  const user = await User.findOne({ email: decoded.email }).select('-passwordHash')
  return user
}
