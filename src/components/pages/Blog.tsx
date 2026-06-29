'use client'

import React, { useState } from 'react'
import { BookOpen, Calendar, Clock, User, ChevronRight } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  category: 'Travel' | 'Reviews' | 'Safety' | 'Maintenance'
  date: string
  readTime: string
  author: string
  summary: string
  content: string
  image: string
}

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>('All')

  const posts: BlogPost[] = [
    {
      id: 1,
      title: 'Himalayan Packing Checklist: Ride to Ladakh Ready',
      category: 'Travel',
      date: '2026-06-25',
      readTime: '6 min read',
      author: 'Vikram Rathore',
      summary: 'Preparing for Ladakh requires thorough checks. Here is a definitive checklist covering warm gear, dry bags, clutch cables, and fuel canisters.',
      content: 'Riding at 18,000 feet requires careful preparation. First, layering is key: base thermals, fleece layers, and windproof outer gear. Keep spare throttle cables, clutch levers, and spark plugs in your tank bags. Always pack heavy luggage low and centered to preserve bike balance on loose gravel. Ensure you carry physical xerox copies of permitting documentation for army transit checkpoints in Leh.',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 2,
      title: 'Group Formations: Standard Road Signs & Safety Protocols',
      category: 'Safety',
      date: '2026-06-12',
      readTime: '4 min read',
      author: 'Aditya Hegde',
      summary: 'How does STARMC maintain safe spacing on national highways? Learn the hand signals for single file, gravel alerts, and fuel stops.',
      content: 'Group safety relies on mutual hand sign visibility. Staggered formation is our standard on wide open double highways: the Lead Rider takes the right track, and Rider 2 takes the left track, spaced 1 second behind. Signal single-file formation on single narrow roads or mountain pass bridges by raising one index finger above your helmet. Point with your boot to warn riders behind of road potholes, oil spills, or gravel hazards.',
      image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 3,
      title: 'Monsoon Maintenance: Protecting Chain & Brake Pads',
      category: 'Maintenance',
      date: '2026-05-28',
      readTime: '5 min read',
      author: 'Rohan D\'Souza',
      summary: 'Damp coastal riding ruins motorcycle chains. Here is how to clean, clean with diesel, dry, and apply premium high-viscosity wet lube.',
      content: 'Wet roads throw silt, mud, and water on your drive train. Clean your chain every 350-400 KM during monsoon season. Use kerosene/diesel sprays with a specialized three-sided chain brush to clear sand particles. Wipe completely dry before applying heavy wet lube on the rollers. Check brake pads regularly; wet mud acts as an abrasive, wearing sintered organic pads 3x faster than dry dust.',
      image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 4,
      title: 'Detailed Review: Royal Enfield Himalayan 450 on Trails',
      category: 'Reviews',
      date: '2026-05-10',
      readTime: '8 min read',
      author: 'Meera Krishnan',
      summary: 'An honest review of the Sherpa 450 engine after logging 5,000 KM of highway touring, rocky trails, and deep sandy riverbeds.',
      content: 'The liquid-cooled Sherpa engine is a massive leap forward. Generating 40 BHP, it cruises at 110 KM/H with ease. The 21-inch front spoke wheel swallows stones on rocky sections of the Spiti valley. However, the high seat height (825mm) and wet weight (196kg) make slow speed maneuvers challenging for shorter adventure riders. Suspension tuning is plush, absorbing highway bumps effortlessly.',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600'
    }
  ]

  const categories = ['All', 'Travel', 'Safety', 'Maintenance', 'Reviews']

  const filteredPosts = posts.filter(post => {
    if (categoryFilter === 'All') return true
    return post.category === categoryFilter
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 pb-20">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-bebas text-5xl text-white tracking-wider">
          RIDER BLOGS
        </h1>
        <div className="h-1.5 w-24 bg-brandRed mx-auto rounded"></div>
        <p className="text-sm text-slate-400 font-sans pt-2">
          Knowledge is power on the road. Read travel reports, safety guides, riding gear reviews, and bike maintenance tips from seasoned road captains.
        </p>
      </section>

      {/* Categories */}
      <section className="flex justify-center space-x-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              categoryFilter === cat 
                ? 'bg-brandRed text-white shadow-md shadow-brandRed/20' 
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-805'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <div 
            key={post.id}
            className="rounded-xl border border-slate-805 bg-slate-900/40 overflow-hidden flex flex-col justify-between hover:border-brandRed/35 transition-all duration-300 group"
          >
            <div>
              {/* Image */}
              <div className="h-56 relative bg-slate-950 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <span className="absolute top-3 left-3 rounded bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brandOrange">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3.5">
                <div className="flex items-center space-x-4 text-[10px] text-slate-500 font-bold">
                  <div className="flex items-center">
                    <Calendar className="mr-1.5 h-3.5 w-3.5 text-slate-650" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1.5 h-3.5 w-3.5 text-slate-650" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="font-oswald text-base font-bold uppercase text-slate-200 tracking-wide line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>
            </div>

            {/* Read action */}
            <div className="border-t border-slate-805 bg-slate-950/20 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-450 uppercase">
                <User className="h-3.5 w-3.5 text-slate-550" />
                <span>By {post.author}</span>
              </div>

              <button 
                onClick={() => setSelectedPost(post)}
                className="flex items-center space-x-1 text-xs font-bold text-brandRed hover:text-red-400 transition-colors"
              >
                <span>Read Full Article</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* FULL POST POPUP MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setSelectedPost(null)} />
          
          <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl border border-slate-850 bg-slate-900 text-left text-slate-200 shadow-2xl transition-all duration-300">
            {/* Image */}
            <div className="h-56 relative bg-slate-950">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="absolute inset-0 h-full w-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute right-4 top-4 rounded-full bg-slate-950/60 p-2 text-slate-350 hover:text-white"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6 pr-12">
                <span className="rounded bg-brandRed px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  {selectedPost.category}
                </span>
                <h2 className="font-bebas text-2xl sm:text-3xl font-bold tracking-wider text-white mt-1.5 line-clamp-1">{selectedPost.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[50vh] overflow-y-auto p-6 space-y-4">
              <div className="flex items-center space-x-4 text-[10px] text-slate-500 font-bold border-b border-slate-805/70 pb-3">
                <div className="flex items-center"><User className="mr-1 h-3.5 w-3.5 text-slate-650" /><span>By {selectedPost.author}</span></div>
                <div className="flex items-center"><Calendar className="mr-1 h-3.5 w-3.5 text-slate-650" /><span>{selectedPost.date}</span></div>
                <div className="flex items-center"><Clock className="mr-1 h-3.5 w-3.5 text-slate-650" /><span>{selectedPost.readTime}</span></div>
              </div>

              <p className="text-sm font-semibold text-slate-300 italic leading-relaxed">
                {selectedPost.summary}
              </p>

              <div className="text-xs text-slate-400 leading-relaxed font-sans pt-2 whitespace-pre-line space-y-3">
                {selectedPost.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-805 bg-slate-950/60 p-5 text-right">
              <button 
                onClick={() => setSelectedPost(null)}
                className="rounded bg-slate-800 hover:bg-slate-750 px-5 py-2.5 text-xs font-bold uppercase text-slate-300"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
