'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'

export const Contact: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you, ${name}! Your inquiry has been routed to the STARMC Core Committee. We will reach out within 24 hours.`)
    setName('')
    setEmail('')
    setMsg('')
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hello STARMC! I'd like to ask about chapter registrations.")
    window.open(`https://wa.me/918012345678?text=${text}`, '_blank')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 pb-20">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-bebas text-5xl text-white tracking-wider">
          GET IN TOUCH
        </h1>
        <div className="h-1.5 w-24 bg-brandRed mx-auto rounded"></div>
        <p className="text-sm text-slate-400 font-sans pt-2">
          Have questions about starting a chapter, buying premium kits, or partnering on rides? Drop us a message or jump directly into a WhatsApp session.
        </p>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="rounded-xl border border-slate-805 bg-slate-900/40 p-6 sm:p-8 space-y-6">
          <h3 className="font-oswald text-base font-bold uppercase tracking-wider text-slate-200">Send an Inquiry</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Your Name</label>
              <input 
                type="text" 
                required
                placeholder="Ishaan" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="ishaan@example.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Message / Question</label>
              <textarea 
                rows={4}
                required
                placeholder="Ask about rides, chapters, or support..." 
                value={msg}
                onChange={e => setMsg(e.target.value)}
                className="w-full rounded border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-brandRed focus:outline-none resize-none"
              />
            </div>
            <button 
              type="submit"
              className="w-full flex items-center justify-center space-x-2 rounded bg-brandRed py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-750 transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit Message</span>
            </button>
          </form>
        </div>

        {/* Info panel & Map */}
        <div className="space-y-8">
          <div className="rounded-xl border border-slate-805 bg-slate-900/40 p-6 sm:p-8 space-y-6">
            <h3 className="font-oswald text-base font-bold uppercase tracking-wider text-slate-200">Immediate Channels</h3>
            
            <div className="space-y-4 text-xs">
              {/* WhatsApp direct */}
              <button 
                onClick={handleWhatsApp}
                className="flex w-full items-center justify-center space-x-2 rounded bg-green-600 hover:bg-green-700 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors shadow shadow-green-600/10"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat via WhatsApp</span>
              </button>

              <div className="border-t border-slate-805/70 pt-4 space-y-3.5">
                <div className="flex items-center text-slate-350">
                  <Phone className="mr-3.5 h-4.5 w-4.5 text-brandRed" />
                  <span>Call Core Committee: +91-80-1234 5678</span>
                </div>
                <div className="flex items-center text-slate-350">
                  <Mail className="mr-3.5 h-4.5 w-4.5 text-brandRed" />
                  <span>Official Email: info@starmc.in</span>
                </div>
                <div className="flex items-start text-slate-350">
                  <MapPin className="mr-3.5 h-4.5 w-4.5 text-brandRed shrink-0" />
                  <span>HQ: Level 4, UB City, Vittal Mallya Road, Bengaluru - 560001</span>
                </div>
              </div>
            </div>
          </div>

          {/* Styled Map Placeholder */}
          <div className="rounded-xl border border-slate-805 overflow-hidden h-44 relative bg-slate-950">
            {/* Visual Simulated Map Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-2">
              <MapPin className="h-8 w-8 text-brandRed animate-bounce" />
              <p className="text-xs font-bold text-slate-250">STARMC HQ @ UB City, Bengaluru</p>
              <p className="text-[10px] text-slate-500">Google Map API mock rendering</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
