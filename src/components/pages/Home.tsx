'use client'

import React from 'react'
import { useStarMc } from '@/context/StarMcContext'
import { Award, Compass, ShieldCheck, Map, Users, ChevronRight, Star } from 'lucide-react'

export const Home: React.FC = () => {
  const { setActiveTab, rides } = useStarMc()
  const spotlightRide = rides[0]

  const corePillars = [
    { icon: Compass, title: 'Adventure Inspired', desc: 'Conquer the most challenging routes from mountain passes to coastal highways.' },
    { icon: ShieldCheck, title: 'Safe Riding', desc: 'Group marshals, safety briefings, and standard operating procedures for group rides.' },
    { icon: Users, title: 'Brotherhood', desc: 'Open to all motorcycle brands. It is the rider that matters, not the machine.' },
    { icon: Award, title: 'Rewards System', desc: 'Earn points and ride miles milestones to unlock premium club merchandise.' }
  ]

  const partnerBrands = [
    { name: 'Triumph India', type: 'Dealer Partner' },
    { name: 'BMW Motorrad', type: 'Dealer Partner' },
    { name: 'Royal Enfield', type: 'Dealer Partner' },
    { name: 'Klim Gear', type: 'Gear Partner' },
    { name: 'Rynox Gears', type: 'Gear Partner' },
    { name: 'Shell Fuel', type: 'Fuel Partner' },
    { name: 'Red Fox Resorts', type: 'Hospitality Partner' },
    { name: 'Acko Insurance', type: 'Insurance Partner' }
  ]

  const testimonials = [
    {
      name: 'Aditya Hegde',
      motorcycle: 'Triumph Tiger 900',
      exp: 'Joining STARMC changed how I tour. The road captain support and safety marshals make long distance riding stress-free. Truly a premium family of riders!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'Vikram Rathore',
      motorcycle: 'BMW R1250 GS Adventure',
      exp: 'The ride miles program and leaderboard keeps the motivation high. The Ladakh expedition was flawlessly planned. 10/10 management.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'Meera Krishnan',
      motorcycle: 'KTM 390 Adventure',
      exp: 'Being a female rider in a multi-brand club can sometimes feel daunting, but STARMC has the most welcoming and supportive brotherhood and sisterhood.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
    }
  ]

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative flex h-[85vh] items-center justify-center overflow-hidden">
        {/* Background Image / Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.95)), url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1920')` 
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <span className="inline-block rounded-full bg-brandRed/20 border border-brandRed/30 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brandOrange mb-6">
            Star Motorcycle Club India
          </span>
          <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl font-bold tracking-wider text-white leading-none">
            RIDE TOGETHER. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed via-brandOrange to-brandGold">
              CREATE MEMORIES.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 font-sans tracking-wide">
            Live the journey. Join India&apos;s ultimate multi-brand riding community where the highway never ends and brotherhood knows no borders.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button 
              onClick={() => setActiveTab('Membership')}
              className="rounded-full bg-brandRed px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-brandRed/20 transition-all hover:bg-red-700 hover:shadow-brandRed/45 hover:-translate-y-0.5 active:translate-y-0"
            >
              Join STARMC
            </button>
            <button 
              onClick={() => setActiveTab('Rides')}
              className="rounded-full border border-slate-700 bg-slate-900/60 backdrop-blur-sm px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-200 transition-all hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Rides
            </button>
          </div>
        </div>
      </section>

      {/* PILLARS / ADVANTAGES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-bebas text-4xl tracking-wider text-white">
            Why STARMC India?
          </h2>
          <div className="h-1 w-20 bg-brandRed mx-auto mt-2 rounded"></div>
          <p className="mt-4 text-sm text-slate-400">
            We are more than just a club; we are a community of passionate motorcycle tourists. We believe in safe throttles and deep friendships.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {corePillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div 
                key={idx} 
                className="group relative rounded-xl border border-slate-800/80 bg-slate-900/50 p-6 transition-all duration-300 hover:border-brandRed/40 hover:bg-slate-900"
              >
                <div className="mb-4 inline-flex rounded-lg bg-brandRed/10 p-3 text-brandRed group-hover:bg-brandRed group-hover:text-white transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-oswald text-lg font-bold uppercase text-slate-200 group-hover:text-white tracking-wide">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  {pillar.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* RIDE SPOTLIGHT */}
      {spotlightRide && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 sm:h-96 lg:h-full">
                <img 
                  src={spotlightRide.gallery[0]} 
                  alt={spotlightRide.title} 
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 space-y-6">
                <span className="inline-block rounded bg-brandRed/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brandRed self-start">
                  Featured Ride
                </span>
                <h2 className="font-bebas text-3xl sm:text-5xl text-white tracking-wider">
                  {spotlightRide.title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {spotlightRide.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Map className="h-4 w-4 text-brandOrange" />
                    <span>State: {spotlightRide.state}</span>
                  </div>
                  <div>Difficulty: <span className="text-brandRed">{spotlightRide.difficulty}</span></div>
                  <div>Distance: <span className="text-brandOrange">{spotlightRide.distance} KM</span></div>
                  <div>Duration: <span className="text-slate-100">{spotlightRide.duration}</span></div>
                </div>
                <button 
                  onClick={() => setActiveTab('Rides')}
                  className="flex items-center justify-center space-x-2 rounded-full bg-brandRed px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-all self-start"
                >
                  <span>View Details & Register</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PARTNER BRANDS */}
      <section className="bg-slate-950/40 py-16 border-y border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-3xl tracking-wider text-slate-400">
              Club Partners & Affiliates
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Exclusive discounts, free servicing checks, and stays for STARMC Premium members.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {partnerBrands.map((brand, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-center rounded border border-slate-900 bg-slate-900/40 p-4 text-center hover:border-slate-800 transition-colors"
              >
                <span className="font-oswald text-xs font-bold text-slate-300 truncate w-full">{brand.name}</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 mt-1">{brand.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-bebas text-4xl tracking-wider text-white">
            Brotherhood Stories
          </h2>
          <div className="h-1 w-20 bg-brandRed mx-auto mt-2 rounded"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((test, idx) => (
            <div 
              key={idx} 
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-6 relative"
            >
              <div className="flex items-center space-x-1 text-brandGold">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brandGold" />
                ))}
              </div>
              <p className="text-sm italic leading-relaxed text-slate-300">
                &ldquo;{test.exp}&rdquo;
              </p>
              <div className="flex items-center space-x-4 border-t border-slate-800/80 pt-4">
                <img 
                  src={test.image} 
                  alt={test.name} 
                  className="h-10 w-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{test.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{test.motorcycle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
