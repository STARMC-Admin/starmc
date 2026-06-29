'use client'

import React from 'react'
import { Calendar, ShieldAlert, Award, Heart, Sparkles } from 'lucide-react'

export const Events: React.FC = () => {
  const specialEvents = [
    {
      title: 'STARMC India Annual Rally 2026',
      category: 'Annual Rally',
      date: '2026-11-20 to 2026-11-22',
      location: 'Vagator Beach Arena, Goa',
      desc: 'The biggest national gathering of STARMC riders. 3 days of custom bike showcases, stunt arenas, highway touring talks, live music, and deep beach brotherhood bondings.',
      icon: Award
    },
    {
      title: 'Monsoon Riding Safety Workshop',
      category: 'Safety Workshops',
      date: '2026-07-11',
      location: 'Bengaluru Go-Kart track, Karnataka',
      desc: 'Learn advanced braking control, target fixation recovery, dynamic weight shifts on slippery slush, and defensive highway positioning under heavy rains.',
      icon: ShieldCheck
    },
    {
      title: 'Flood Relief Charity Ride',
      category: 'Charity Rides',
      date: '2026-08-23',
      location: 'Kolhapur regional offices, Maharashtra',
      desc: 'Riding together to deliver essential medical kits and solar lights to rain-affected remote farming hamlets in the Western Ghats buffer zone.',
      icon: Heart
    },
    {
      title: 'Delhi to Jaipur Bike Night',
      category: 'Bike Nights',
      date: '2026-09-18',
      location: 'NH-48 Highway Stretches',
      desc: 'Sleek night cruise under open skies, ending with piping hot traditional tea and parathas at a Rajasthani heritage hotel. Headlight sweeps alignment checklist mandatory.',
      icon: Sparkles
    }
  ]

  const categoriesList = [
    'Annual Rally',
    'Safety Workshops',
    'Charity Rides',
    'Bike Nights',
    'Breakfast Rides',
    'Coffee Rides',
    'Weekend Escapes',
    'Adventure Tours'
  ]

  const handleRegister = (title: string) => {
    alert(`Success! You have submitted a registration request for "${title}". Details and ticket passes will be sent via SMS/Email.`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 pb-20">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-bebas text-5xl text-white tracking-wider">
          CLUB EVENTS
        </h1>
        <div className="h-1.5 w-24 bg-brandRed mx-auto rounded"></div>
        <p className="text-sm text-slate-400 font-sans pt-2">
          Beyond our standard weekend calendars, we host annual mega rallies, safety schools, bike display nights, and flood relief runs across the country.
        </p>
      </section>

      {/* Category showcase pills */}
      <section className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
        {categoriesList.map((cat, i) => (
          <span 
            key={i} 
            className="rounded bg-slate-900/80 border border-slate-805 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-350"
          >
            {cat}
          </span>
        ))}
      </section>

      {/* Events Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {specialEvents.map((ev, idx) => {
          // Custom compile check for ShieldCheck rendering
          const Icon = ev.icon || Award
          return (
            <div 
              key={idx}
              className="rounded-xl border border-slate-805 bg-slate-900/40 p-6 sm:p-8 flex flex-col justify-between hover:border-brandRed/35 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="rounded bg-brandOrange/10 border border-brandOrange/25 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brandOrange">
                    {ev.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold flex items-center">
                    <Calendar className="mr-1.5 h-3.5 w-3.5 text-slate-650" /> {ev.date}
                  </span>
                </div>

                <h3 className="font-oswald text-base sm:text-lg font-bold uppercase text-slate-200 tracking-wide line-clamp-1 group-hover:text-white transition-colors">
                  {ev.title}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {ev.desc}
                </p>
                
                <p className="text-[10px] font-bold text-slate-450 uppercase">
                  Location: <strong className="text-slate-300">{ev.location}</strong>
                </p>
              </div>

              <button
                onClick={() => handleRegister(ev.title)}
                className="w-full rounded bg-brandRed py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-750 transition-colors mt-6"
              >
                Register for Event
              </button>
            </div>
          )
        })}
      </section>
    </div>
  )
}

// Quick placeholder fallback for compilation
const ShieldCheck: React.FC<any> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
)
