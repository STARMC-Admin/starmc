'use client'

import React from 'react'
import { ShieldCheck, Compass, HeartHandshake, Eye } from 'lucide-react'

export const About: React.FC = () => {
  const values = [
    { icon: Compass, title: 'Unbound Adventure', desc: 'We seek out the unexplored trails, challenging curves, and beautiful landscapes of India.' },
    { icon: ShieldCheck, title: 'Safety Integrity', desc: 'Every ride is marshaled, speeds are controlled, safety gear is mandatory. Safety is non-negotiable.' },
    { icon: HeartHandshake, title: 'Lifelong Brotherhood', desc: 'No matter the motorcycle make or model—Royal Enfield, KTM, Triumph, BMW, or Suzuki—we ride as one.' },
    { icon: Eye, title: 'Community Driven', desc: 'We give back through highway cleanup campaigns, blood drives, and supporting local road-side vendors.' }
  ]

  const timeline = [
    { year: '2019', title: 'The Spark', desc: 'Founded by 5 passionate touring riders in Bengaluru. Opened registration to all engine sizes and brands, shattering traditional single-brand club walls.' },
    { year: '2020', title: 'Spreading Wings', desc: 'Established Karnataka, Maharashtra, and Delhi chapters. Over 2,000 verified members register for weekend breakfast rides.' },
    { year: '2022', title: 'The Mileage Revolution', desc: 'Introduced the Ride Miles reward system. Verified over 2.5 Million collective kilometers ridden. Member base hits 10,000 riders.' },
    { year: '2024', title: 'conquering Heights', desc: 'Organized our first 50-rider fully marshaled expedition to Khardung La, Ladakh. Partnered with major riding gear and bike dealerships.' },
    { year: '2026', title: 'STARMC India Today', desc: 'Over 25,000 members, 6 state-level active chapters, and expanding to north-east states. The biggest and safest multi-brand motorcycle community in India.' }
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-20 pb-20">
      {/* Intro */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-bebas text-5xl text-white tracking-wider">
          THE STARMC STORY
        </h1>
        <div className="h-1.5 w-24 bg-brandRed mx-auto rounded"></div>
        <p className="text-base text-slate-300 leading-relaxed font-sans pt-2">
          STARMC (Star Motorcycle Club India) was born out of a simple idea: motorcycle riding is not about the logo on your fuel tank. It is about the passion in your chest, the brotherhood on the highway, and the stories we create under our helmets.
        </p>
      </section>

      {/* Philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-oswald text-2xl font-bold uppercase tracking-wider text-slate-200">
            Open to Every Brand, Driven by Brotherhood
          </h2>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            Unlike standard motorcycle clubs limited to single manufacturers, STARMC welcomes everyone. Whether you cruise on a Royal Enfield Meteor, carve corners on a KTM Duke, tour on a Triumph Tiger, or sprint on a Suzuki Hayabusa, our formations are open to you.
          </p>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            Our priority is safe, organized, and adventurous group touring. We ensure every rider is equipped, trained, and backed by a supportive team of sweep riders, lead captains, and medical coordinators.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-8 grid grid-cols-2 gap-4">
          <div className="text-center border-r border-b border-slate-800/80 p-4">
            <p className="font-bebas text-4xl text-brandRed font-bold">25,000+</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Active Members</p>
          </div>
          <div className="text-center border-b border-slate-800/80 p-4">
            <p className="font-bebas text-4xl text-brandOrange font-bold">6+</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">State Chapters</p>
          </div>
          <div className="text-center border-r border-slate-800/80 p-4">
            <p className="font-bebas text-4xl text-brandGold font-bold">5M+</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Ride KM Logged</p>
          </div>
          <div className="text-center p-4">
            <p className="font-bebas text-4xl text-white font-bold">200+</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Annual Rides</p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="font-bebas text-3xl text-white tracking-wider">Our Core Pillars</h2>
          <p className="text-xs text-slate-500 mt-1">The code of conduct that fuels the STARMC community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <div key={i} className="rounded-lg border border-slate-850 bg-slate-900/50 p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-brandRed/10 p-3 text-brandRed mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-oswald text-base font-bold text-slate-200 uppercase tracking-wider">{v.title}</h3>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{v.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="font-bebas text-3xl text-white tracking-wider">Club Timeline</h2>
          <p className="text-xs text-slate-500 mt-1">Our journey from a 5-rider meet to India&apos;s biggest club.</p>
        </div>

        <div className="relative border-l-2 border-slate-800 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-10">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-slate-900 border-2 border-brandRed group-hover:bg-brandRed transition-colors duration-300">
                <div className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-white" />
              </div>
              
              <div className="rounded-lg border border-slate-800 bg-slate-900/20 p-5 group-hover:bg-slate-900/40 transition-colors duration-300">
                <span className="font-bebas text-xl text-brandOrange font-bold tracking-wider">{item.year}</span>
                <h3 className="font-oswald text-base font-bold text-slate-250 uppercase tracking-wide mt-1">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
