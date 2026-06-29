'use client'

import React, { useState } from 'react'
import { useStarMc, Chapter } from '@/context/StarMcContext'
import { Users, Mail, Phone, Calendar, Heart, ShieldAlert, Award } from 'lucide-react'

export const Chapters: React.FC = () => {
  const { chapters } = useStarMc()
  const [selectedChapterState, setSelectedChapterState] = useState<string>('Karnataka')

  const activeChapter = chapters.find(c => c.state === selectedChapterState) || chapters[0]

  // Chapter-specific events simulation data
  const chapterEvents: Record<string, { title: string; date: string; type: string }[]> = {
    'Karnataka': [
      { title: 'Nandi Hills Sunrise coffee run', date: '2026-07-05', type: 'Coffee Ride' },
      { title: 'Mullayanagiri Mist curve climb', date: '2026-09-12', type: 'Weekend Escape' }
    ],
    'Maharashtra': [
      { title: 'Lonavala Monsoon breakfast cruise', date: '2026-07-12', type: 'Breakfast Ride' },
      { title: 'Lavasa twists weekend camping', date: '2026-08-22', type: 'Weekend Escape' }
    ],
    'Delhi NCR': [
      { title: 'Greater Noida Express Bike Night', date: '2026-07-19', type: 'Bike Night' },
      { title: 'Sariska Sanctuary early run', date: '2026-09-05', type: 'Weekend Escape' }
    ],
    'Tamil Nadu': [
      { title: 'East Coast Road (ECR) dawn cruise', date: '2026-07-26', type: 'Coffee Ride' },
      { title: 'Kolli Hills 70 hairpin climb', date: '2026-10-02', type: 'Adventure Tour' }
    ],
    'Rajasthan': [
      { title: 'Sambhar Salt Lake sand session', date: '2026-08-16', type: 'Adventure Tour' },
      { title: 'Pushkar Desert camp rally', date: '2026-11-14', type: 'Annual Rally' }
    ],
    'Goa': [
      { title: 'Arambol beach sunset bonfire run', date: '2026-08-08', type: 'Bike Night' },
      { title: 'Dudhsagar forest trail climb', date: '2026-12-10', type: 'Adventure Tour' }
    ]
  }

  const handleJoinChapter = () => {
    alert(`Request sent to Chapter Director ${activeChapter.director}! You will be added to the local STARMC ${activeChapter.state} group chat shortly.`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 pb-20">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-bebas text-5xl text-white tracking-wider">
          LOCAL CHAPTERS
        </h1>
        <div className="h-1.5 w-24 bg-brandRed mx-auto rounded"></div>
        <p className="text-sm text-slate-400 font-sans pt-2">
          STARMC spans across major states in India. Connect with your local chapter director, participate in state coffee runs, and coordinate regional routes.
        </p>
      </section>

      {/* State Selector list */}
      <section className="flex flex-wrap justify-center gap-3">
        {chapters.map((ch) => (
          <button
            key={ch.state}
            onClick={() => setSelectedChapterState(ch.state)}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              selectedChapterState === ch.state 
                ? 'bg-brandRed text-white shadow-md shadow-brandRed/20' 
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-805'
            }`}
          >
            {ch.state} Chapter
          </button>
        ))}
      </section>

      {/* Chapter Information Card */}
      {activeChapter && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-5xl mx-auto pt-6">
          {/* Card Left: Chapter Overview */}
          <div className="rounded-xl border border-slate-805 bg-slate-900/40 p-6 space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brandOrange">State Chapter</span>
              <h2 className="font-bebas text-3xl font-bold tracking-wide text-white mt-1">{activeChapter.state}</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">Established {activeChapter.establishedDate}</p>
            </div>

            <div className="border-t border-slate-805/70 pt-4 space-y-3.5 text-xs text-slate-350">
              <div className="flex items-center justify-between">
                <span>Riders Registered</span>
                <strong className="text-white">{activeChapter.memberCount} members</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Chapter Status</span>
                <span className="rounded-full bg-green-500/10 border border-green-500/25 px-2 py-0.5 text-[9px] font-bold text-green-400">
                  Active
                </span>
              </div>
            </div>

            <button 
              onClick={handleJoinChapter}
              className="w-full rounded bg-brandRed py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-750 transition-colors"
            >
              Join Local Chapter
            </button>
          </div>

          {/* Card Middle: Director Card */}
          <div className="rounded-xl border border-slate-805 bg-slate-900/40 p-6 space-y-6">
            <h3 className="font-oswald text-sm font-bold uppercase tracking-wider text-slate-200">Chapter Director</h3>
            
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700">
                <Users className="h-8 w-8 text-slate-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase">{activeChapter.director}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">STARMC Chapter Marshal</p>
              </div>
            </div>

            <div className="border-t border-slate-805/70 pt-4 space-y-3.5 text-xs">
              <a 
                href={`mailto:${activeChapter.email}`}
                className="flex items-center text-slate-350 hover:text-brandRed transition-colors"
              >
                <Mail className="mr-3 h-4.5 w-4.5 text-brandRed" />
                <span>{activeChapter.email}</span>
              </a>
              <a 
                href={`tel:${activeChapter.phone}`}
                className="flex items-center text-slate-350 hover:text-brandRed transition-colors"
              >
                <Phone className="mr-3 h-4.5 w-4.5 text-brandRed" />
                <span>{activeChapter.phone}</span>
              </a>
            </div>
          </div>

          {/* Card Right: State Events */}
          <div className="rounded-xl border border-slate-805 bg-slate-900/40 p-6 space-y-6">
            <h3 className="font-oswald text-sm font-bold uppercase tracking-wider text-slate-200">Chapter Ride Events</h3>
            
            <div className="space-y-4">
              {chapterEvents[activeChapter.state]?.map((ev, idx) => (
                <div key={idx} className="flex flex-col border-b border-slate-805/50 pb-3 last:border-none last:pb-0">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brandOrange">{ev.type}</span>
                  <h4 className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">{ev.title}</h4>
                  <div className="flex items-center text-[10px] text-slate-500 mt-1">
                    <Calendar className="mr-1.5 h-3.5 w-3.5 text-slate-600" />
                    <span>{ev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Chapters Slogan Slogan */}
      <section className="bg-slate-950/30 p-8 rounded-xl border border-slate-850 text-center max-w-4xl mx-auto space-y-4">
        <h3 className="font-oswald text-lg font-bold uppercase tracking-wider text-slate-200">Don&apos;t see your state chapter?</h3>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
          If you have a group of 15+ local touring riders in your state and want to form an official STARMC Chapter, reach out to the core committee to apply for a marshaling charter.
        </p>
        <button 
          onClick={() => alert('Contacting core founders at info@starmc.in for Chapter charter application.')}
          className="rounded border border-slate-700 bg-slate-900/50 hover:bg-slate-900 px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 transition-colors"
        >
          Apply for Charter Director
        </button>
      </section>
    </div>
  )
}
