'use client'

import React, { useState } from 'react'
import { Image, Video, Camera, PlayCircle } from 'lucide-react'

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'photo' | 'video' | 'drone'>('all')

  const mediaItems = [
    {
      id: 1,
      type: 'photo',
      title: 'Ladakh Khardung La Pass Climb',
      url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
      caption: 'Verified STARMC riders at the highest motorable road in the world.'
    },
    {
      id: 2,
      type: 'video',
      title: 'Western Ghats Odyssey Highlights',
      url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
      caption: 'Highlights of the monsoon curves ride around Chikmagalur.'
    },
    {
      id: 3,
      type: 'drone',
      title: 'Rajasthan Desert Formation Aerial',
      url: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=800',
      caption: 'Stunning drone capture of our 40-bike single file desert cruise.'
    },
    {
      id: 4,
      type: 'photo',
      title: 'Mumbai Western Express Dawn Ride',
      url: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800',
      caption: 'Sunday breakfast ride assembly in Maharashtra.'
    },
    {
      id: 5,
      type: 'photo',
      title: 'Goa Coast Beach bonfire assembly',
      url: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=800',
      caption: 'Riders unwinding after a 600km highway run.'
    },
    {
      id: 6,
      type: 'drone',
      title: 'Nilgiris Hairpin bends drone shot',
      url: 'https://images.unsplash.com/photo-1558981852-78d19ab97382?auto=format&fit=crop&q=80&w=800',
      caption: 'Drone capture of the 36 hairpin curves climb to Ooty.'
    }
  ]

  const filteredMedia = mediaItems.filter(item => {
    if (filter === 'all') return true
    return item.type === filter
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 pb-20">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-bebas text-5xl text-white tracking-wider">
          CLUB GALLERY
        </h1>
        <div className="h-1.5 w-24 bg-brandRed mx-auto rounded"></div>
        <p className="text-sm text-slate-400 font-sans pt-2">
          Glimpses from the highway. Browse ride photo albums, dynamic drone footage, and member-submitted stories.
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="flex justify-center space-x-2">
        {[
          { id: 'all', label: 'All Media', icon: Camera },
          { id: 'photo', label: 'Photos Only', icon: Image },
          { id: 'video', label: 'Videos', icon: Video },
          { id: 'drone', label: 'Drone Footage', icon: Video }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex items-center space-x-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                filter === tab.id 
                  ? 'bg-brandRed text-white shadow-md shadow-brandRed/20' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-805'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMedia.map((item) => (
          <div 
            key={item.id} 
            className="rounded-xl border border-slate-805 bg-slate-900/40 overflow-hidden group hover:border-slate-700 transition-all duration-300 relative"
          >
            {/* Thumbnail */}
            <div className="h-64 relative bg-slate-950 overflow-hidden">
              <img 
                src={item.url} 
                alt={item.title} 
                className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Play overlays for videos */}
              {(item.type === 'video' || item.type === 'drone') && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <PlayCircle className="h-14 w-14 text-white stroke-[1.25] drop-shadow-lg" />
                </div>
              )}

              {/* Tag */}
              <span className="absolute bottom-3 left-3 rounded bg-slate-900/90 backdrop-blur-sm border border-slate-800 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brandOrange">
                {item.type === 'drone' ? 'Drone Shot' : item.type}
              </span>
            </div>

            {/* Captions */}
            <div className="p-5 space-y-2">
              <h3 className="font-oswald text-sm font-bold uppercase text-slate-200 tracking-wide line-clamp-1">{item.title}</h3>
              <p className="text-[11px] leading-relaxed text-slate-450">{item.caption}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
