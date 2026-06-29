'use client'

import React, { useState } from 'react'
import { useStarMc } from '@/context/StarMcContext'
import { ShieldCheck, Plus, Check, X, Database, TrendingUp, Users, Calendar } from 'lucide-react'

export const AdminDashboard: React.FC = () => {
  const { user, verifications, approveVerification, rejectVerification, addNewRide } = useStarMc()
  
  // New Ride states
  const [newRideTitle, setNewRideTitle] = useState('')
  const [newRideDate, setNewRideDate] = useState('')
  const [newRideLocation, setNewRideLocation] = useState('')
  const [newRideState, setNewRideState] = useState('Karnataka')
  const [newRideDifficulty, setNewRideDifficulty] = useState<'Easy' | 'Moderate' | 'Hard'>('Easy')
  const [newRideDistance, setNewRideDistance] = useState(300)
  const [newRideDuration, setNewRideDuration] = useState('2 Days')
  const [newRideCaptain, setNewRideCaptain] = useState('')
  const [newRideMeetingPoint, setNewRideMeetingPoint] = useState('')
  const [newRideDesc, setNewRideDesc] = useState('')
  
  const [activeSubTab, setActiveSubTab] = useState<'logs' | 'addRide'>('logs')

  // Authorization Check
  if (!user || user.email !== 'admin@starmc.in') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center space-y-4">
        <ShieldCheck className="mx-auto h-16 w-16 text-slate-700 stroke-[1.5]" />
        <h2 className="font-bebas text-3xl text-red-500">ADMIN CONTROL REQUIRED</h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">This dashboard requires core administrative credentials. Sign in using admin@starmc.in.</p>
      </div>
    )
  }

  const handleCreateRide = (e: React.FormEvent) => {
    e.preventDefault()
    addNewRide({
      title: newRideTitle,
      date: newRideDate,
      location: newRideLocation,
      state: newRideState,
      difficulty: newRideDifficulty,
      distance: Number(newRideDistance),
      duration: newRideDuration,
      rideCaptain: newRideCaptain,
      adventure: true,
      weekend: true,
      description: newRideDesc,
      schedule: [
        { time: '06:00 AM', activity: 'Assemble at Chapter meeting point' },
        { time: '08:30 AM', activity: 'Breakfast briefing halt' },
        { time: '02:00 PM', activity: 'Reach destination resort' }
      ],
      meetingPoint: newRideMeetingPoint,
      fuelStops: ['NH bypass gas outlet'],
      breakfastStop: 'Highway King Hotel',
      lunchStop: 'Rider Midway Lounge',
      emergencyContacts: ['Highway police assistance: 112']
    })

    alert(`Successfully launched new ride: "${newRideTitle}" in Calendar!`)
    
    // Clear forms
    setNewRideTitle('')
    setNewRideDate('')
    setNewRideLocation('')
    setNewRideCaptain('')
    setNewRideMeetingPoint('')
    setNewRideDesc('')
    setActiveSubTab('logs')
  }

  // Analytics helper calculations
  const pendingRequests = verifications.filter(v => v.status === 'Pending')
  const totalApprovedKm = verifications
    .filter(v => v.status === 'Approved')
    .reduce((sum, v) => sum + v.distance, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 pb-20">
      {/* Header */}
      <section className="border-b border-slate-805 pb-6">
        <span className="text-amber-500 text-[10px] uppercase font-bold tracking-widest flex items-center">
          <Database className="mr-1.5 h-3.5 w-3.5" /> Database Administrator Access
        </span>
        <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide mt-2">ADMIN PANEL</h1>
      </section>

      {/* Analytics widgets */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-lg border border-slate-805 bg-slate-900/35 p-5 space-y-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Chapter Directors</span>
          <p className="font-bebas text-3xl text-white font-bold">6 Active</p>
        </div>
        <div className="rounded-lg border border-slate-805 bg-slate-900/35 p-5 space-y-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pending Odometer Reviews</span>
          <p className="font-bebas text-3xl text-brandOrange font-bold">{pendingRequests.length} Requests</p>
        </div>
        <div className="rounded-lg border border-slate-805 bg-slate-900/35 p-5 space-y-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Verified Mileage Approved</span>
          <p className="font-bebas text-3xl text-brandRed font-bold">{totalApprovedKm.toLocaleString('en-IN')} KM</p>
        </div>
        <div className="rounded-lg border border-slate-805 bg-slate-900/35 p-5 space-y-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Vercel Build Environment</span>
          <p className="font-bebas text-3xl text-green-400 font-bold">Ready</p>
        </div>
      </section>

      {/* Navigation Sub-Tabs */}
      <section className="flex border-b border-slate-805">
        <button
          onClick={() => setActiveSubTab('logs')}
          className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeSubTab === 'logs' 
              ? 'text-brandRed border-brandRed' 
              : 'text-slate-500 border-transparent hover:text-slate-350'
          }`}
        >
          Verify Ride Logs ({pendingRequests.length})
        </button>
        <button
          onClick={() => setActiveSubTab('addRide')}
          className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeSubTab === 'addRide' 
              ? 'text-brandRed border-brandRed' 
              : 'text-slate-500 border-transparent hover:text-slate-350'
          }`}
        >
          Add Upcoming Ride
        </button>
      </section>

      {/* Admin Content */}
      <section className="max-w-4xl mx-auto">
        {activeSubTab === 'logs' && (
          <div className="space-y-6">
            <h3 className="font-oswald text-base font-bold uppercase tracking-wider text-slate-200">Pending Kilometer Submissions</h3>
            
            {pendingRequests.length === 0 ? (
              <p className="text-slate-500 text-xs py-8 text-center italic">No pending mileage verification requests.</p>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <div 
                    key={req.id}
                    className="rounded-xl border border-slate-805 bg-slate-900/40 p-5 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center space-x-2">
                        <span className="rounded bg-slate-950 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                          {req.distance} KM
                        </span>
                        <h4 className="text-sm font-bold text-slate-200 uppercase">{req.userName}</h4>
                      </div>
                      <p className="text-xs text-slate-400 font-medium">Logged: <strong className="text-slate-300">{req.rideTitle}</strong> ({req.date})</p>
                      <p className="text-[10px] text-slate-500 italic">Proof note: {req.proofUrl}</p>
                    </div>

                    <div className="flex space-x-2 shrink-0">
                      <button
                        onClick={() => approveVerification(req.id)}
                        className="flex items-center justify-center space-x-1.5 rounded bg-green-600 hover:bg-green-700 px-4 py-2 text-xs font-bold text-white transition-colors"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => rejectVerification(req.id)}
                        className="flex items-center justify-center space-x-1.5 rounded bg-slate-800 hover:bg-slate-750 px-4 py-2 text-xs font-bold text-slate-300 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'addRide' && (
          <div className="rounded-xl border border-slate-805 bg-slate-900/30 p-6 sm:p-8 space-y-6">
            <h3 className="font-oswald text-base font-bold uppercase tracking-wider text-slate-200">Inject Ride Event Details</h3>
            
            <form onSubmit={handleCreateRide} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Ride Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Ooty Hairpins Escape" 
                    value={newRideTitle}
                    onChange={e => setNewRideTitle(e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Ride Date</label>
                  <input 
                    type="date" 
                    required
                    value={newRideDate}
                    onChange={e => setNewRideDate(e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Specific Location Route</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Ooty Loop, Nilgiri" 
                    value={newRideLocation}
                    onChange={e => setNewRideLocation(e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">State Chapter Location</label>
                  <select 
                    value={newRideState}
                    onChange={e => setNewRideState(e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Goa">Goa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Difficulty Tier</label>
                  <select 
                    value={newRideDifficulty}
                    onChange={e => setNewRideDifficulty(e.target.value as any)}
                    className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
                  >
                    <option value="Easy">Easy (Cruising)</option>
                    <option value="Moderate">Moderate (Curves)</option>
                    <option value="Hard">Hard (Alpine/Endurance)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Distance (KM)</label>
                  <input 
                    type="number" 
                    required
                    value={newRideDistance}
                    onChange={e => setNewRideDistance(Number(e.target.value))}
                    className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Duration</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 2 Days" 
                    value={newRideDuration}
                    onChange={e => setNewRideDuration(e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Ride Captain</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Marshal Name" 
                    value={newRideCaptain}
                    onChange={e => setNewRideCaptain(e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Assemble Point</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Nelamangala Toll Gate, 06:00 AM" 
                    value={newRideMeetingPoint}
                    onChange={e => setNewRideMeetingPoint(e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Detailed Route Description</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Enter detailed highway codes, overnight halts, and safety notes..." 
                  value={newRideDesc}
                  onChange={e => setNewRideDesc(e.target.value)}
                  className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center space-x-1.5 rounded bg-brandRed py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-750 transition-colors mt-2"
              >
                <Plus className="h-4 w-4" />
                <span>Publish Ride in Calendar</span>
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  )
}
