'use client'

import React from 'react'
import { useStarMc } from '@/context/StarMcContext'
import { Instagram, Facebook, Youtube, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react'

export const Footer: React.FC = () => {
  const { setActiveTab } = useStarMc()

  const handleNavClick = (tab: string) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      {/* Newsletter / CTA */}
      <div className="mx-auto max-w-7xl border-b border-slate-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="font-bebas text-2xl tracking-wider text-white">
              Stay in the Loop
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Subscribe to get updates on upcoming rides, safety workshops, merchandise drops, and chapter announcements.
            </p>
          </div>
          <div className="flex max-w-md w-full md:ml-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-l-md border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-brandRed focus:outline-none"
            />
            <button className="flex items-center justify-center rounded-r-md bg-brandRed px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand Info */}
          <div>
            <span className="font-bebas text-3xl font-bold tracking-wider text-white cursor-pointer" onClick={() => handleNavClick('Home')}>
              STAR<span className="text-brandRed">MC</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              India&apos;s premium multi-brand motorcycle community. Bringing riders together to conquer highways, explore the unexplored, and foster safe riding culture.
            </p>
            <p className="mt-4 font-poppins text-xs font-semibold italic text-brandOrange">
              &quot;Ride Together. Create Memories. Live the Journey.&quot;
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="font-oswald text-sm font-bold uppercase tracking-widest text-slate-200">
              Club Links
            </h4>
            <ul className="mt-6 space-y-3.5 text-sm">
              {['Home', 'About', 'Membership', 'Rides', 'Rewards'].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => handleNavClick(tab)}
                    className="hover:text-brandRed transition-colors hover:underline text-left"
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop / Resources */}
          <div>
            <h4 className="font-oswald text-sm font-bold uppercase tracking-widest text-slate-200">
              Resources
            </h4>
            <ul className="mt-6 space-y-3.5 text-sm">
              {['Merchandise', 'Chapters', 'Events', 'Gallery', 'Blog'].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => handleNavClick(tab)}
                    className="hover:text-brandRed transition-colors hover:underline text-left"
                  >
                    {tab === 'Merchandise' ? 'Merchandise Store' : tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-oswald text-sm font-bold uppercase tracking-widest text-slate-200">
              Headquarters
            </h4>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 shrink-0 text-brandRed" />
                <span>
                  STARMC India HQ, Level 4, UB City, Vittal Mallya Road, Bengaluru, Karnataka - 560001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-4 w-4 shrink-0 text-brandRed" />
                <a href="tel:+918012345678" className="hover:text-white transition-colors">
                  +91-80-1234 5678
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-4 w-4 shrink-0 text-brandRed" />
                <a href="mailto:info@starmc.in" className="hover:text-white transition-colors">
                  info@starmc.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Socials & Copyright */}
        <div className="mt-16 border-t border-slate-800 pt-8 sm:flex sm:items-center sm:justify-between">
          <div className="flex space-x-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500 sm:mt-0">
            &copy; {new Date().getFullYear()} STARMC India Motorcycle Club. All rights reserved. Designed for premium brotherhood.
          </p>
        </div>
      </div>
    </footer>
  )
}
