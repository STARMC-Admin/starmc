'use client'

import React, { useState } from 'react'
import { useStarMc, Ride } from '@/context/StarMcContext'
import { Calendar, MapPin, Gauge, ShieldAlert, Navigation, Sun, Phone, CheckCircle } from 'lucide-react'

interface RidesProps {
  onOpenAuth: () => void
}

export const Rides: React.FC<RidesProps> = ({ onOpenAuth }) => {
  const { rides, user, registerForRide } = useStarMc()
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null)
  
  // Filter States
  const [stateFilter, setStateFilter] = useState('All')
  const [distanceFilter, setDistanceFilter] = useState('All')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [weekendFilter, setWeekendFilter] = useState('All')
  const [adventureFilter, setAdventureFilter] = useState('All')

  // Derive unique states for filters
  const uniqueStates = ['All', ...Array.from(new Set(rides.map(r => r.state)))]

  // Filter Logic
  const filteredRides = rides.filter(ride => {
    if (stateFilter !== 'All' && ride.state !== stateFilter) return false
    if (difficultyFilter !== 'All' && ride.difficulty !== difficultyFilter) return false
    
    if (weekendFilter !== 'All') {
      const isWeekend = weekendFilter === 'Weekend'
      if (ride.weekend !== isWeekend) return false
    }

    if (adventureFilter !== 'All') {
      const isAdv = adventureFilter === 'Adventure'
      if (ride.adventure !== isAdv) return false
    }

    if (distanceFilter !== 'All') {
      if (distanceFilter === 'Short' && ride.distance > 400) return false
      if (distanceFilter === 'Long' && ride.distance <= 400) return false
    }

    return true
  })

  const handleRegister = async (rideId: number) => {
    if (!user) {
      alert('Please sign in to register for STARMC official rides.')
      onOpenAuth()
      return
    }
    const success = await registerForRide(rideId)
    if (success) {
      alert('Registration successful! Check your Member Dashboard for ride details.')
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 pb-20">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-bebas text-5xl text-white tracking-wider">
          RIDE CALENDAR
        </h1>
        <div className="h-1.5 w-24 bg-brandRed mx-auto rounded"></div>
        <p className="text-sm text-slate-400 font-sans pt-2">
          Find your next adventure. Browse through our upcoming weekend coffee runs, coastal cruises, and high-altitude Himalayan expeditions.
        </p>
      </section>

      {/* Advanced Filters */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/30 p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-350 mb-4">Filter Saddle Routes</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* State */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">State</label>
            <select 
              value={stateFilter} 
              onChange={e => setStateFilter(e.target.value)}
              className="w-full rounded border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
            >
              {uniqueStates.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Difficulty</label>
            <select 
              value={difficultyFilter} 
              onChange={e => setDifficultyFilter(e.target.value)}
              className="w-full rounded border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
            >
              <option value="All">All Levels</option>
              <option value="Easy">Easy (Cruising)</option>
              <option value="Moderate">Moderate (Winds/Twists)</option>
              <option value="Hard">Hard (Alpine/Endurance)</option>
            </select>
          </div>

          {/* Distance */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Distance</label>
            <select 
              value={distanceFilter} 
              onChange={e => setDistanceFilter(e.target.value)}
              className="w-full rounded border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
            >
              <option value="All">Any Distance</option>
              <option value="Short">Short (Under 400 KM)</option>
              <option value="Long">Long (Over 400 KM)</option>
            </select>
          </div>

          {/* Weekend */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Schedule</label>
            <select 
              value={weekendFilter} 
              onChange={e => setWeekendFilter(e.target.value)}
              className="w-full rounded border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
            >
              <option value="All">Any Days</option>
              <option value="Weekend">Weekend Rides</option>
              <option value="Weekday">Weekday Expeditions</option>
            </select>
          </div>

          {/* Adventure */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Category</label>
            <select 
              value={adventureFilter} 
              onChange={e => setAdventureFilter(e.target.value)}
              className="w-full rounded border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Adventure">Adventure/Off-road</option>
              <option value="Cruising">Asphalt/Cruising</option>
            </select>
          </div>
        </div>
      </section>

      {/* Ride Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRides.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500">
            <p className="text-sm font-semibold">No rides matching current filter selectors.</p>
            <button 
              onClick={() => { setStateFilter('All'); setDifficultyFilter('All'); setDistanceFilter('All'); setWeekendFilter('All'); setAdventureFilter('All'); }} 
              className="text-brandRed text-xs underline font-bold mt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredRides.map(ride => (
            <div 
              key={ride.id}
              className="rounded-xl border border-slate-805 bg-slate-900/40 overflow-hidden flex flex-col justify-between hover:border-brandRed/35 transition-all duration-300 group"
            >
              <div>
                {/* Banner */}
                <div className="h-44 relative bg-slate-950">
                  <img 
                    src={ride.gallery[0] || 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=600'} 
                    alt={ride.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 rounded bg-slate-900/90 backdrop-blur-sm border border-slate-800 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-350">
                    {ride.duration}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                  <span className={`inline-block rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    ride.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    ride.difficulty === 'Moderate' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                    'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}>
                    {ride.difficulty} Difficulty
                  </span>

                  <h3 className="font-oswald text-lg font-bold uppercase text-slate-200 tracking-wide line-clamp-1">
                    {ride.title}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-400 font-medium">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-brandRed" />
                      <span>{new Date(ride.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-brandOrange" />
                      <span className="truncate">{ride.location} ({ride.state})</span>
                    </div>
                    <div className="flex items-center">
                      <Gauge className="mr-2 h-4 w-4 text-brandGold" />
                      <span>{ride.distance} KM Distance</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="border-t border-slate-805 bg-slate-950/20 px-6 py-4 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedRide(ride)}
                  className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  View Details & Route
                </button>

                {user?.registeredRides.includes(ride.id) ? (
                  <span className="flex items-center text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" /> Registered
                  </span>
                ) : (
                  <button 
                    onClick={() => handleRegister(ride.id)}
                    className="rounded-full bg-brandRed px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-750 transition-colors"
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </section>

      {/* DETAIL MODAL */}
      {selectedRide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setSelectedRide(null)} />
          
          <div className="relative w-full max-w-3xl transform overflow-hidden rounded-xl border border-slate-850 bg-slate-900 text-left text-slate-200 shadow-2xl transition-all duration-300">
            {/* Immersive Hero */}
            <div className="h-56 relative bg-slate-950">
              <img 
                src={selectedRide.gallery[0]} 
                alt={selectedRide.title} 
                className="absolute inset-0 h-full w-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <button 
                onClick={() => setSelectedRide(null)}
                className="absolute right-4 top-4 rounded-full bg-slate-950/60 p-2 text-slate-300 hover:text-white hover:bg-slate-950 transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="rounded bg-brandRed px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  {selectedRide.difficulty} Route
                </span>
                <h2 className="font-bebas text-3xl sm:text-4xl font-bold tracking-wider text-white mt-1.5">{selectedRide.title}</h2>
              </div>
            </div>

            {/* Modal Body Scroll */}
            <div className="max-h-[50vh] overflow-y-auto p-6 space-y-8">
              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-oswald text-xs font-bold uppercase tracking-widest text-slate-400">Expedition Slogan</h4>
                <p className="text-sm text-slate-350 leading-relaxed font-sans">{selectedRide.description}</p>
              </div>

              {/* Ride stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-slate-805 py-4 text-xs">
                <div>
                  <p className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">Date</p>
                  <p className="text-slate-200 font-semibold mt-0.5">{selectedRide.date}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">Captain</p>
                  <p className="text-slate-200 font-semibold mt-0.5">{selectedRide.rideCaptain}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">Distance</p>
                  <p className="text-slate-200 font-semibold mt-0.5">{selectedRide.distance} KM</p>
                </div>
                <div>
                  <p className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">State Chapter</p>
                  <p className="text-slate-200 font-semibold mt-0.5">{selectedRide.state}</p>
                </div>
              </div>

              {/* Route Map & Fuel stops */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                <div className="space-y-3">
                  <h4 className="font-oswald text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center">
                    <Navigation className="mr-1.5 h-4 w-4 text-brandRed" /> Schedule & Stops
                  </h4>
                  <ul className="space-y-2.5 leading-relaxed text-slate-350">
                    <li><strong className="text-slate-200">Meeting Point:</strong> {selectedRide.meetingPoint}</li>
                    <li><strong className="text-slate-200">Breakfast Stop:</strong> {selectedRide.breakfastStop}</li>
                    <li><strong className="text-slate-200">Lunch Stop:</strong> {selectedRide.lunchStop}</li>
                    <li><strong className="text-slate-200">Fuel Stops:</strong> {selectedRide.fuelStops.join(', ')}</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-oswald text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center">
                    <Sun className="mr-1.5 h-4 w-4 text-brandOrange" /> Weather Info
                  </h4>
                  <p className="leading-relaxed text-slate-350">{selectedRide.weather}</p>
                  
                  <h4 className="font-oswald text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center pt-2">
                    <Phone className="mr-1.5 h-4 w-4 text-brandGold" /> Emergency Assistance
                  </h4>
                  <ul className="space-y-1.5 text-slate-400">
                    {selectedRide.emergencyContacts.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Route Itinerary Schedule Timeline */}
              <div className="space-y-4 pt-2">
                <h4 className="font-oswald text-xs font-bold uppercase tracking-widest text-slate-400">Route Schedule Itinerary</h4>
                <div className="space-y-2">
                  {selectedRide.schedule.map((s, idx) => (
                    <div key={idx} className="flex space-x-3 text-xs border-b border-slate-805/40 pb-2">
                      <span className="font-bold text-brandOrange w-16 shrink-0">{s.time}</span>
                      <span className="text-slate-300">{s.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="border-t border-slate-805 bg-slate-950/60 p-6 flex justify-between items-center">
              <span className="text-[11px] text-slate-500 font-medium">
                * All riders must carry valid insurance and mandatory armor guards.
              </span>
              
              {user?.registeredRides.includes(selectedRide.id) ? (
                <button 
                  disabled
                  className="rounded bg-green-500/20 border border-green-500/30 px-6 py-2.5 text-xs font-bold uppercase text-green-400"
                >
                  Rider Confirmed
                </button>
              ) : (
                <button 
                  onClick={() => { handleRegister(selectedRide.id); setSelectedRide(null); }}
                  className="rounded bg-brandRed px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-750 transition-colors shadow-md shadow-brandRed/20"
                >
                  Confirm Registration
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
