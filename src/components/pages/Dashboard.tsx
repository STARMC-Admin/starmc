'use client'

import React, { useState } from 'react'
import { useStarMc } from '@/context/StarMcContext'
import { Award, QrCode, ClipboardList, ShieldCheck, ShoppingBag, Eye, Calendar, Sparkles, Navigation } from 'lucide-react'

export const Dashboard: React.FC = () => {
  const { user, rides, addRideVerification, activeTab, setActiveTab } = useStarMc()
  const [flipped, setFlipped] = useState(false)
  
  // Log submission form states
  const [rideTitle, setRideTitle] = useState('')
  const [distance, setDistance] = useState(150)
  const [proof, setProof] = useState('')

  // Certificate Modal State
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center space-y-4">
        <ClipboardList className="mx-auto h-16 w-16 text-slate-700 stroke-[1.5]" />
        <h2 className="font-bebas text-3xl text-white">SADDLE LOCKED</h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">Please login or register using the top-right button to access your digital membership card and logs.</p>
      </div>
    )
  }

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addRideVerification(rideTitle, Number(distance), proof)
    alert('Verification request submitted! Chapter Director will review and approve your miles shortly.')
    setRideTitle('')
    setDistance(150)
    setProof('')
  }

  // Get matching user registered rides
  const myRegisteredRides = rides.filter(r => user.registeredRides.includes(r.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 pb-20">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-805 pb-8">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brandOrange">Member Profile</span>
          <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide mt-1">{user.name}</h1>
          <p className="text-xs text-slate-500 mt-1">Riding a <strong className="text-slate-350">{user.motorcycle}</strong> in the <strong className="text-slate-350">{user.chapter} Chapter</strong></p>
        </div>

        <div className="flex gap-3 text-center">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded">
            <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Ride Miles</span>
            <p className="text-lg font-bebas font-bold text-white mt-0.5">{user.miles} KM</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded">
            <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Points</span>
            <p className="text-lg font-bebas font-bold text-brandRed mt-0.5">{user.points} PTS</p>
          </div>
        </div>
      </section>

      {/* Grid: Digital Card & Logs */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* CARD CONTAINER */}
        <div className="flex flex-col items-center space-y-6">
          <h3 className="font-oswald text-sm font-bold uppercase tracking-wider text-slate-200 self-start">Digital Membership Card</h3>
          
          {/* Card Component */}
          <div 
            className="w-full max-w-[380px] h-[220px] cursor-pointer perspective [perspective:1000px]"
            onClick={() => setFlipped(!flipped)}
          >
            <div className={`relative w-full h-full rounded-2xl transition-transform duration-700 transform-style [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
              {/* Front Side */}
              <div className={`absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between border backface-hidden [backface-visibility:hidden] ${
                user.membership === 'Premium' 
                  ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 border-amber-500/40 text-amber-100 shadow-lg shadow-amber-500/5'
                  : 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border-slate-850 text-slate-100'
              }`}>
                <div className="flex justify-between items-start">
                  <span className="font-bebas text-2xl font-bold tracking-widest text-white">
                    STAR<span className="text-brandRed">MC</span>
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest ${
                    user.membership === 'Premium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/35' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {user.membership || 'Rookie'} Card
                  </span>
                </div>
                
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Member ID</p>
                  <p className="font-mono text-sm tracking-widest text-slate-250 mt-0.5">{user.digitalCardId}</p>
                </div>

                <div className="flex justify-between items-end border-t border-slate-800/80 pt-4">
                  <div>
                    <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Rider Name</p>
                    <p className="text-xs font-bold text-slate-200 mt-0.5 uppercase">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Chapter</p>
                    <p className="text-[10px] font-bold text-brandOrange mt-0.5 uppercase">{user.chapter} Chapter</p>
                  </div>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 w-full h-full rounded-2xl p-6 flex items-center justify-between border border-slate-800 bg-slate-950 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="space-y-2">
                  <span className="font-bebas text-lg tracking-wider text-slate-400">STARMC INDIA</span>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">Scan card QR code during group rides check-in and breakfast events verification.</p>
                  <p className="text-[9px] text-brandRed font-mono font-bold">Expires: {new Date().getFullYear() + 1}-06-30</p>
                </div>
                <div className="bg-white p-2 rounded shrink-0">
                  <QrCode className="h-16 w-16 text-black" />
                </div>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-550 italic">Click card to rotate/flip.</p>
        </div>

        {/* LOG LOG SUBMISSION */}
        <div className="rounded-xl border border-slate-805 bg-slate-900/40 p-6 sm:p-8 space-y-6">
          <h3 className="font-oswald text-sm font-bold uppercase tracking-wider text-slate-200">Submit Ride Logs for Points</h3>
          
          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Ride Route / Slogan Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Ooty Twister loop run" 
                value={rideTitle}
                onChange={e => setRideTitle(e.target.value)}
                className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Distance (KM)</label>
                <input 
                  type="number" 
                  required
                  min={10}
                  value={distance}
                  onChange={e => setDistance(Number(e.target.value))}
                  className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Proof Attachment Note</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Odometer photo uploaded" 
                  value={proof}
                  onChange={e => setProof(e.target.value)}
                  className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full rounded bg-brandRed py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-750 transition-colors"
            >
              Request Odometer Verification
            </button>
          </form>
        </div>
      </section>

      {/* Tab Sections: Achievements, Rides, Orders */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Achievements list */}
        <div className="rounded-xl border border-slate-805 bg-slate-900/40 p-6 space-y-4">
          <h3 className="font-oswald text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center">
            <Award className="mr-2 h-4 w-4 text-brandRed animate-pulse" /> Achievements
          </h3>
          <div className="space-y-2">
            {user.achievements.map((ach, i) => (
              <div key={i} className="flex items-center space-x-2 bg-slate-950/60 p-2.5 rounded border border-slate-850">
                <Sparkles className="h-3.5 w-3.5 text-brandOrange shrink-0" />
                <span className="text-[10px] text-slate-200">{ach}</span>
              </div>
            ))}
          </div>

          {/* Certificate Download Segment */}
          {user.miles >= 1000 && (
            <div className="border-t border-slate-805/70 pt-4">
              <h4 className="font-oswald text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Available Certificates</h4>
              <button 
                onClick={() => setSelectedCertificate('1000 KM Milestone')}
                className="flex items-center text-[10px] font-bold text-brandRed hover:underline"
              >
                Download 1000 KM Tour Certificate
              </button>
            </div>
          )}
        </div>

        {/* Registered Rides list */}
        <div className="rounded-xl border border-slate-805 bg-slate-900/40 p-6 space-y-4">
          <h3 className="font-oswald text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-brandRed" /> Registered Events
          </h3>
          {myRegisteredRides.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs">
              <p>No upcoming registered events.</p>
              <button 
                onClick={() => setActiveTab('Rides')}
                className="text-brandRed text-[10px] font-bold underline mt-1"
              >
                Browse Rides
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {myRegisteredRides.map(ride => (
                <div key={ride.id} className="flex justify-between items-start bg-slate-950/60 p-3 rounded border border-slate-850">
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-bold text-slate-200 line-clamp-1">{ride.title}</h4>
                    <p className="text-[9px] text-slate-500">{ride.date}</p>
                  </div>
                  <span className="rounded bg-brandOrange/15 px-2 py-0.5 text-[8px] font-bold text-brandOrange">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shop Orders History list */}
        <div className="rounded-xl border border-slate-805 bg-slate-900/40 p-6 space-y-4">
          <h3 className="font-oswald text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center">
            <ShoppingBag className="mr-2 h-4 w-4 text-brandRed" /> Saddlebag Orders
          </h3>
          {user.orders.length === 0 ? (
            <p className="text-slate-500 text-center py-6 text-xs">No orders recorded yet.</p>
          ) : (
            <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
              {user.orders.map((ord, idx) => (
                <div key={idx} className="bg-slate-950/60 p-3 rounded border border-slate-850 space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-350">
                    <span>{ord.id}</span>
                    <span className="text-slate-500">{ord.date}</span>
                  </div>
                  <p className="text-[10px] text-slate-200 truncate">{ord.items}</p>
                  <div className="flex justify-between items-center text-[9px] pt-1">
                    <span className="font-bold text-brandRed">
                      {typeof ord.total === 'number' ? `₹${ord.total.toLocaleString('en-IN')}` : ord.total}
                    </span>
                    <span className={`rounded-full px-1.5 py-0.5 font-bold ${
                      ord.status === 'Delivered' ? 'bg-green-500/10 text-green-400' : 'bg-brandOrange/10 text-brandOrange'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedCertificate(null)} />
          
          <div className="relative w-full max-w-lg transform overflow-hidden rounded-xl border border-amber-500/45 bg-slate-950 p-8 text-center text-slate-200 shadow-2xl transition-all duration-300">
            {/* Elegant Certificate Border */}
            <div className="border-4 border-double border-amber-500/40 p-6 space-y-6">
              <span className="font-bebas text-xl tracking-widest text-slate-500">STARMC INDIA</span>
              
              <h2 className="font-bebas text-4xl text-brandGold tracking-wider">CERTIFICATE OF ACHIEVEMENT</h2>
              
              <p className="text-xs text-slate-400">This certifies that</p>
              
              <p className="font-oswald text-xl font-bold uppercase tracking-wide text-white border-b border-slate-800 pb-2 max-w-xs mx-auto">{user.name}</p>
              
              <p className="text-xs leading-relaxed text-slate-400">
                has successfully completed the verified milestone of riding over
              </p>
              
              <p className="font-bebas text-3xl text-brandRed font-bold">1,000 VERIFIED KILOMETERS</p>
              
              <p className="text-xs text-slate-450 leading-relaxed max-w-xs mx-auto">
                on multi-brand tours, upholding the highest standards of safety, camaraderie, and brotherhood.
              </p>

              <div className="flex justify-between items-end pt-8 text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                <div>
                  <p className="border-t border-slate-800 pt-1 max-w-[120px] mx-auto">Chapter Director</p>
                </div>
                <div>
                  <p className="font-mono text-slate-600">ID: {user.digitalCardId}</p>
                </div>
                <div>
                  <p className="border-t border-slate-800 pt-1 max-w-[120px] mx-auto">Core Founder</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedCertificate(null)}
              className="mt-6 rounded bg-brandRed px-5 py-2.5 text-xs font-bold uppercase text-white hover:bg-red-750"
            >
              Close Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
