'use client'

import React from 'react'
import { useStarMc } from '@/context/StarMcContext'
import { Check, ShieldCheck, Gift, Star, Award } from 'lucide-react'

interface MembershipProps {
  onOpenAuth: () => void
}

export const Membership: React.FC<MembershipProps> = ({ onOpenAuth }) => {
  const { user, buyMembership, setActiveTab } = useStarMc()

  const handlePurchase = (plan: 'Standard' | 'Premium') => {
    if (!user) {
      alert('Please sign in or register to join STARMC India.')
      onOpenAuth()
      return
    }
    buyMembership(plan)
    alert(`Success! You have activated your STARMC ${plan} Membership. Check your digital membership card in the dashboard!`)
    setActiveTab('Dashboard')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const standardBenefits = [
    'Official STARMC Digital Membership Card',
    'Personal Member Profile in Dashboard',
    'Full access to Ride Calendar & Chapters',
    'Standard registration rate for annual rallies',
    'Access to local WhatsApp and Telegram groups',
    '10% discount on official merchandise',
    '250 points starter reward points'
  ]

  const premiumBenefits = [
    'Everything in Standard Membership',
    'Welcome physical kit (Embroided patch, metal key chain, decals, logbook)',
    'Exclusive access to Premium-Only expedition rides',
    '2x points multiplier on all logged ride miles',
    'Priority registration slot (2 days before public)',
    '20% discount on official merchandise',
    '500 points starter reward points',
    'Special Premium badge marker on the Leaderboard'
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 pb-20">
      {/* Intro */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-bebas text-5xl text-white tracking-wider">
          JOIN THE SQUADRON
        </h1>
        <div className="h-1.5 w-24 bg-brandRed mx-auto rounded"></div>
        <p className="text-sm text-slate-400 font-sans pt-2">
          Become a part of India&apos;s largest motorcycle family. Choose a plan that suits your throttle style and unlock digital cards, exclusive routes, and premium merchandise discounts.
        </p>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Standard Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 relative overflow-hidden">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Tier 01</span>
            <h2 className="font-oswald text-2xl font-bold uppercase text-white mt-1">Standard</h2>
            <p className="text-xs text-slate-400 mt-2">Essential membership to start riding, tracking miles, and getting recognized.</p>
            
            <div className="my-6">
              <span className="font-bebas text-4xl font-bold text-white">₹1,999</span>
              <span className="text-xs text-slate-500 font-medium"> / Year</span>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-350 border-t border-slate-800/80 pt-6">
              {standardBenefits.map((b, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-4 w-4 text-brandRed mr-3 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8">
            {user?.membership === 'Standard' ? (
              <div className="w-full rounded bg-slate-800 py-3 text-center text-xs font-bold uppercase text-slate-400 border border-slate-700">
                Current Plan
              </div>
            ) : user?.membership === 'Premium' ? (
              <div className="w-full rounded bg-slate-800/30 py-3 text-center text-xs font-bold uppercase text-slate-500 border border-slate-800">
                Standard Tier Included
              </div>
            ) : (
              <button 
                onClick={() => handlePurchase('Standard')}
                className="w-full rounded bg-slate-800 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-750 transition-colors"
              >
                Become Standard Member
              </button>
            )}
          </div>
        </div>

        {/* Premium Card */}
        <div className="rounded-xl border-2 border-brandRed bg-slate-900 p-8 flex flex-col justify-between hover:border-brandRed transition-all duration-300 relative overflow-hidden shadow-xl shadow-brandRed/5">
          <div className="absolute top-0 right-0 bg-brandRed px-4 py-1 text-[9px] font-bold uppercase tracking-widest text-white rounded-bl">
            Popular Choice
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brandOrange">Tier 02</span>
            <h2 className="font-oswald text-2xl font-bold uppercase text-white mt-1 flex items-center">
              Premium 
              <Star className="ml-2 h-4 w-4 text-brandOrange fill-brandOrange" />
            </h2>
            <p className="text-xs text-slate-400 mt-2">The ultimate touring club pass with welcoming hardware, maximum reward points, and VIP access.</p>
            
            <div className="my-6">
              <span className="font-bebas text-4xl font-bold text-white">₹4,999</span>
              <span className="text-xs text-slate-500 font-medium"> / Year</span>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-300 border-t border-slate-850 pt-6">
              {premiumBenefits.map((b, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-4 w-4 text-brandOrange mr-3 shrink-0" />
                  <span className={i > 0 && i < 4 ? "font-semibold text-slate-200" : ""}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8">
            {user?.membership === 'Premium' ? (
              <div className="w-full rounded border border-brandOrange/30 bg-brandOrange/10 py-3 text-center text-xs font-bold uppercase text-brandOrange">
                Active Premium Rider
              </div>
            ) : (
              <button 
                onClick={() => handlePurchase('Premium')}
                className="w-full rounded bg-brandRed py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 shadow-md shadow-brandRed/20 hover:shadow-brandRed/35 transition-all"
              >
                Get Premium Membership
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Kit Preview */}
      <section className="max-w-4xl mx-auto rounded-xl border border-slate-800 bg-slate-950/40 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-brandOrange text-[10px] uppercase font-bold tracking-wider">Unboxing</span>
          <h3 className="font-oswald text-xl font-bold uppercase text-white mt-1">STARMC Welcome Kit</h3>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            Premium members receive a premium gift box containing:
          </p>
          <ul className="mt-4 space-y-2 text-xs text-slate-400">
            <li className="flex items-center"><Gift className="mr-2 h-4 w-4 text-brandRed" /> Metal Member Slogan Keychain</li>
            <li className="flex items-center"><Gift className="mr-2 h-4 w-4 text-brandRed" /> Premium vinyl highway decals</li>
            <li className="flex items-center"><Gift className="mr-2 h-4 w-4 text-brandRed" /> Custom state chapter clothing patch</li>
            <li className="flex items-center"><Gift className="mr-2 h-4 w-4 text-brandRed" /> Leatherbound hard cover ride logbook</li>
          </ul>
        </div>
        <div className="relative h-48 rounded-lg overflow-hidden border border-slate-800">
          <img 
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600" 
            alt="Welcome Kit" 
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        </div>
      </section>
    </div>
  )
}
