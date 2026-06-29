'use client'

import React, { useState } from 'react'
import { useStarMc } from '@/context/StarMcContext'
import { X, Mail, Phone, Lock, Globe } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, registerUser } = useStarMc()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [motorcycle, setMotorcycle] = useState('')
  const [chapter, setChapter] = useState('Karnataka')
  
  const [password, setPassword] = useState('')
  
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp' | 'google'>('email')
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')

  if (!isOpen) return null

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginMethod === 'email') {
      login(email || 'ishaan@starmc.in', password || 'user123')
    } else if (loginMethod === 'otp') {
      if (!otpSent) {
        setOtpSent(true)
        alert('Simulated SMS OTP sent to ' + phone + '. Use verification code: 123456')
        return
      } else {
        if (otpCode !== '123456') {
          alert('Invalid simulated OTP! Please enter "123456".')
          return
        }
        login('phone-user@starmc.in', 'user123')
      }
    }
    onClose()
  }

  const handleGoogleLogin = () => {
    login('google-rider@gmail.com', 'user123')
    onClose()
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    registerUser(name, email, motorcycle, chapter)
    alert(`Welcome to the brotherhood, ${name}! Your starter referral bonus points are loaded.`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-xl border border-slate-800 bg-slate-900 px-6 py-8 text-left text-slate-100 shadow-2xl transition-all sm:px-8">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <span className="font-bebas text-3xl font-bold tracking-widest text-white">
            STAR<span className="text-brandRed">MC</span>
          </span>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
            {isRegister ? 'Become a Member' : 'Sign in to the Saddle'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 mb-6">
          <button 
            onClick={() => { setIsRegister(false); setOtpSent(false); }}
            className={`flex-1 py-2 text-center text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${
              !isRegister ? 'text-brandRed border-brandRed' : 'text-slate-500 border-transparent hover:text-slate-300'
            }`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 text-center text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${
              isRegister ? 'text-brandRed border-brandRed' : 'text-slate-500 border-transparent hover:text-slate-300'
            }`}
          >
            Register
          </button>
        </div>

        {isRegister ? (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Full Name</label>
              <input 
                type="text" 
                required
                placeholder="Rider Name" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-slate-200 focus:border-brandRed focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="rider@example.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-slate-200 focus:border-brandRed focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Motorcycle Brand & Model</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Royal Enfield Himalayan, KTM 390" 
                value={motorcycle}
                onChange={e => setMotorcycle(e.target.value)}
                className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-slate-200 focus:border-brandRed focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Local Chapter (State)</label>
              <select 
                value={chapter}
                onChange={e => setChapter(e.target.value)}
                className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-slate-200 focus:border-brandRed focus:outline-none"
              >
                <option value="Karnataka">Karnataka Chapter</option>
                <option value="Maharashtra">Maharashtra Chapter</option>
                <option value="Delhi NCR">Delhi NCR Chapter</option>
                <option value="Tamil Nadu">Tamil Nadu Chapter</option>
                <option value="Rajasthan">Rajasthan Chapter</option>
                <option value="Goa">Goa Chapter</option>
              </select>
            </div>
            <button 
              type="submit"
              className="w-full rounded bg-brandRed py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors mt-2"
            >
              Sign Up & Get 200 Pts
            </button>
          </form>
        ) : (
          /* Login Form */
          <div className="space-y-4">
            {/* Method Toggles */}
            <div className="flex justify-center space-x-3 mb-4">
              <button 
                onClick={() => { setLoginMethod('email'); setOtpSent(false); }}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${loginMethod === 'email' ? 'bg-brandRed text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                Email
              </button>
              <button 
                onClick={() => setLoginMethod('otp')}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${loginMethod === 'otp' ? 'bg-brandRed text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                OTP
              </button>
              <button 
                onClick={() => { setLoginMethod('google'); setOtpSent(false); }}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${loginMethod === 'google' ? 'bg-brandRed text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                Google
              </button>
            </div>

            {loginMethod === 'email' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Email Address</label>
                    <span className="text-[10px] text-slate-500 font-medium">Use admin@starmc.in for Admin features</span>
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input 
                      type="email" 
                      required
                      placeholder="rider@starmc.in" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-950 pl-10 pr-3.5 py-2 text-sm text-slate-200 focus:border-brandRed focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-950 pl-10 pr-3.5 py-2 text-sm text-slate-200 focus:border-brandRed focus:outline-none"
                    />
                  </div>
                  <div className="text-right mt-1">
                    <a href="#" className="text-[10px] text-slate-500 hover:text-brandRed">Forgot Password?</a>
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full rounded bg-brandRed py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors mt-2"
                >
                  Log In
                </button>
              </form>
            )}

            {loginMethod === 'otp' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {!otpSent ? (
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 XXXXX XXXXX" 
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full rounded border border-slate-800 bg-slate-950 pl-10 pr-3.5 py-2 text-sm text-slate-200 focus:border-brandRed focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Enter 6-Digit OTP</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter 123456" 
                      maxLength={6}
                      value={otpCode}
                      onChange={e => setOtpCode(e.target.value)}
                      className="w-full text-center tracking-widest font-mono rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-lg text-slate-200 focus:border-brandRed focus:outline-none"
                    />
                  </div>
                )}
                <button 
                  type="submit"
                  className="w-full rounded bg-brandRed py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors mt-2"
                >
                  {otpSent ? 'Verify OTP & Log In' : 'Request OTP Code'}
                </button>
              </form>
            )}

            {loginMethod === 'google' && (
              <div className="space-y-4 pt-2">
                <button 
                  onClick={handleGoogleLogin}
                  className="flex w-full items-center justify-center space-x-3 rounded border border-slate-800 bg-slate-950 py-2.5 hover:bg-slate-800/50 transition-colors"
                >
                  <Globe className="h-5 w-5 text-slate-400" />
                  <span className="text-sm font-bold text-slate-200">Log In with Google</span>
                </button>
                <p className="text-[10px] text-slate-500 text-center">
                  Google OAuth will mock authenticate using a developer profile payload.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
