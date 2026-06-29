'use client'

import React, { useState } from 'react'
import { useStarMc } from '@/context/StarMcContext'
import { Trophy, Calendar, Compass, ShieldAlert, Award } from 'lucide-react'

export const Leaderboard: React.FC = () => {
  const { leaderboard } = useStarMc()
  const [category, setCategory] = useState<'km' | 'rides' | 'volunteering' | 'referrals'>('km')
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('yearly')

  // Sort Leaderboard entries based on selected category
  const sortedLeaders = [...leaderboard].sort((a, b) => {
    if (category === 'km') return b.km - a.km
    if (category === 'rides') return b.rides - a.rides
    if (category === 'volunteering') return b.volunteering - a.volunteering
    return b.referrals - a.referrals
  })

  const getRankBadgeColor = (index: number) => {
    if (index === 0) return 'text-brandGold bg-brandGold/10 border-brandGold/30'
    if (index === 1) return 'text-brandSilver bg-brandSilver/10 border-brandSilver/30'
    if (index === 2) return 'text-amber-700 bg-amber-700/10 border-amber-700/30'
    return 'text-slate-400 bg-slate-800/40 border-slate-800'
  }

  const getTrophyColor = (index: number) => {
    if (index === 0) return 'text-brandGold'
    if (index === 1) return 'text-brandSilver'
    if (index === 2) return 'text-amber-700'
    return 'text-transparent'
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 pb-20">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-bebas text-5xl text-white tracking-wider flex items-center justify-center">
          <Trophy className="mr-3 h-8 w-8 text-brandGold" /> LEADERBOARD
        </h1>
        <div className="h-1.5 w-24 bg-brandRed mx-auto rounded"></div>
        <p className="text-sm text-slate-400 font-sans pt-2">
          Celebrating the asphalt legends. See who has logged the most kilometers, led the most weekend rides, or supported our volunteer campaigns.
        </p>
      </section>

      {/* Controls Segment */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-805 pb-6">
        {/* Category Toggles */}
        <div className="flex flex-wrap gap-2.5">
          {[
            { id: 'km', label: 'Most KM' },
            { id: 'rides', label: 'Most Rides' },
            { id: 'volunteering', label: 'Top Volunteers' },
            { id: 'referrals', label: 'Top Referrals' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id as any)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                category === cat.id 
                  ? 'bg-brandRed text-white shadow-md shadow-brandRed/20' 
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Timeframe Selector */}
        <div className="inline-flex rounded-full bg-slate-950 p-1 border border-slate-850">
          <button 
            onClick={() => setTimeframe('monthly')}
            className={`rounded-full px-4 py-1 text-xs font-semibold uppercase transition-all ${
              timeframe === 'monthly' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-350'
            }`}
          >
            Monthly Champion
          </button>
          <button 
            onClick={() => setTimeframe('yearly')}
            className={`rounded-full px-4 py-1 text-xs font-semibold uppercase transition-all ${
              timeframe === 'yearly' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-350'
            }`}
          >
            Yearly Champion
          </button>
        </div>
      </section>

      {/* Podium Top 3 Standings */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-6">
        {/* Rank 2 */}
        {sortedLeaders[1] && (
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-6 text-center space-y-4 flex flex-col justify-between order-2 md:order-1 md:mt-8">
            <div>
              <div className="relative mx-auto h-20 w-20 flex items-center justify-center rounded-full border-2 border-brandSilver bg-slate-950 text-slate-300 font-bebas text-2xl font-bold">
                2nd
                <Trophy className="absolute -top-1.5 -right-1.5 h-6 w-6 text-brandSilver" />
              </div>
              <h3 className="font-oswald text-base font-bold text-slate-200 mt-4 uppercase tracking-wide">{sortedLeaders[1].name}</h3>
              <p className="text-[10px] text-slate-500">{sortedLeaders[1].motorcycle}</p>
            </div>
            
            <div className="border-t border-slate-805/65 pt-4">
              <span className="text-[10px] uppercase font-bold text-slate-400">Score</span>
              <p className="text-lg font-bebas font-bold text-brandSilver mt-0.5">
                {category === 'km' && `${sortedLeaders[1].km.toLocaleString('en-IN')} KM`}
                {category === 'rides' && `${sortedLeaders[1].rides} Rides`}
                {category === 'volunteering' && `${sortedLeaders[1].volunteering} Events`}
                {category === 'referrals' && `${sortedLeaders[1].referrals} Recruits`}
              </p>
            </div>
          </div>
        )}

        {/* Rank 1 */}
        {sortedLeaders[0] && (
          <div className="rounded-xl border-2 border-brandGold bg-slate-900 p-8 text-center space-y-4 flex flex-col justify-between order-1 md:order-2 shadow-xl shadow-brandGold/5">
            <div>
              <div className="relative mx-auto h-24 w-24 flex items-center justify-center rounded-full border-4 border-brandGold bg-slate-950 text-brandGold font-bebas text-3xl font-bold">
                1st
                <Trophy className="absolute -top-2 -right-2 h-8 w-8 text-brandGold animate-pulse" />
              </div>
              <h3 className="font-oswald text-lg font-bold text-slate-100 mt-4 uppercase tracking-wide">{sortedLeaders[0].name}</h3>
              <p className="text-xs text-slate-400">{sortedLeaders[0].motorcycle}</p>
            </div>
            
            <div className="border-t border-slate-805 pt-4">
              <span className="text-[10px] uppercase font-bold text-brandGold">Monthly Slogan Champion</span>
              <p className="text-2xl font-bebas font-bold text-brandGold mt-1">
                {category === 'km' && `${sortedLeaders[0].km.toLocaleString('en-IN')} KM`}
                {category === 'rides' && `${sortedLeaders[0].rides} Rides`}
                {category === 'volunteering' && `${sortedLeaders[0].volunteering} Events`}
                {category === 'referrals' && `${sortedLeaders[0].referrals} Recruits`}
              </p>
            </div>
          </div>
        )}

        {/* Rank 3 */}
        {sortedLeaders[2] && (
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-6 text-center space-y-4 flex flex-col justify-between order-3 md:mt-12">
            <div>
              <div className="relative mx-auto h-20 w-20 flex items-center justify-center rounded-full border-2 border-amber-700 bg-slate-950 text-amber-700 font-bebas text-2xl font-bold">
                3rd
                <Trophy className="absolute -top-1.5 -right-1.5 h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-oswald text-base font-bold text-slate-200 mt-4 uppercase tracking-wide">{sortedLeaders[2].name}</h3>
              <p className="text-[10px] text-slate-500">{sortedLeaders[2].motorcycle}</p>
            </div>
            
            <div className="border-t border-slate-805/65 pt-4">
              <span className="text-[10px] uppercase font-bold text-slate-400">Score</span>
              <p className="text-lg font-bebas font-bold text-amber-700 mt-0.5">
                {category === 'km' && `${sortedLeaders[2].km.toLocaleString('en-IN')} KM`}
                {category === 'rides' && `${sortedLeaders[2].rides} Rides`}
                {category === 'volunteering' && `${sortedLeaders[2].volunteering} Events`}
                {category === 'referrals' && `${sortedLeaders[2].referrals} Recruits`}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Main Standings Table */}
      <section className="max-w-4xl mx-auto rounded-xl border border-slate-800 bg-slate-900/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Rider</th>
                <th className="px-6 py-4">Motorcycle</th>
                <th className="px-6 py-4">Badge Rank</th>
                <th className="px-6 py-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-805 bg-slate-900/10">
              {sortedLeaders.map((leader, index) => (
                <tr key={index} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4.5">
                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded border font-bebas text-xs font-bold ${getRankBadgeColor(index)}`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4.5 font-bold text-slate-200">{leader.name}</td>
                  <td className="px-6 py-4.5 text-slate-400">{leader.motorcycle}</td>
                  <td className="px-6 py-4.5 text-brandOrange">{leader.badge}</td>
                  <td className="px-6 py-4.5 text-right font-bebas text-sm text-white">
                    {category === 'km' && `${leader.km.toLocaleString('en-IN')} KM`}
                    {category === 'rides' && `${leader.rides} Rides`}
                    {category === 'volunteering' && `${leader.volunteering} Events`}
                    {category === 'referrals' && `${leader.referrals} Recruits`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
