'use client'

import React from 'react'
import { useStarMc } from '@/context/StarMcContext'
import { Award, ShoppingCart, Percent, Ticket, Gem, ArrowRight } from 'lucide-react'

export const Rewards: React.FC = () => {
  const { user, claimReward, setActiveTab } = useStarMc()

  const milestones = [
    { km: 500, badge: 'Asphalt Nomad', desc: 'Starter explorer level. Complete short weekend tours.' },
    { km: 1000, badge: 'Road Warrior', desc: 'Active club rider. Completed a major inter-city tour.' },
    { km: 2500, badge: 'Highway Star', desc: 'Touring regular. Mastered high speed national highways.' },
    { km: 5000, badge: 'Supernova', desc: 'Extreme distance rider. Completed multiple multi-state rides.' },
    { km: 10000, badge: 'Iron Butt Elite', desc: 'Legendary endurance. Rides that push body and motor to limits.' },
    { km: 25000, badge: 'Interstellar Legend', desc: 'Peak touring seniority. Reached the highest state-level milestones.' },
    { km: 50000, badge: 'Centurion Cruiser', desc: 'The ultimate hall of fame. Ridden more than a full global loop.' }
  ]

  const rewardsCatalog = [
    { id: 'R1', title: 'Official STARMC Decal Sticker Pack', cost: 150, type: 'merch', desc: 'Set of 5 high-grade vinyl weather-proof helmet and bike body stickers.', icon: Gem },
    { id: 'R2', title: 'STARMC Premium Ride Keyring', cost: 350, type: 'merch', desc: 'Embroidered nylon pull strap keyring with custom lettering.', icon: Gem },
    { id: 'R3', title: 'STARMC Coffee Mug', cost: 600, type: 'merch', desc: 'Ceramic matte black mug with red interior lining and club logo.', icon: Gem },
    { id: 'R4', title: '₹500 Ride Discount Coupon', cost: 1000, type: 'voucher', desc: 'Redeemable on any upcoming group ride calendar event.', icon: Percent },
    { id: 'R5', title: 'Annual Coffee Meet VIP Pass', cost: 2000, type: 'pass', desc: 'Priority access, free buffet breakfast, and test ride bookings at the rally.', icon: Ticket },
    { id: 'R6', title: 'Limited Edition Winter Jersey', cost: 3500, type: 'merch', desc: 'Warm dry-fit polyester full sleeve jersey with custom state name printing.', icon: Award }
  ]

  // Find next milestone
  const currentMiles = user?.miles || 0
  const nextMilestone = milestones.find(m => currentMiles < m.km) || milestones[milestones.length - 1]
  const currentMilestoneIndex = milestones.findIndex(m => currentMiles < m.km) - 1
  
  // Calculate percentage progress to next milestone
  const prevKm = currentMilestoneIndex >= 0 ? milestones[currentMilestoneIndex].km : 0
  const progressPercent = nextMilestone.km === prevKm 
    ? 100 
    : Math.min(100, Math.floor(((currentMiles - prevKm) / (nextMilestone.km - prevKm)) * 100))

  const handleClaim = async (rewardTitle: string, cost: number) => {
    if (!user) {
      alert('Please sign in to spend your reward points.')
      return
    }
    const success = await claimReward(rewardTitle, cost)
    if (success) {
      setActiveTab('Dashboard')
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-20 pb-20">
      {/* Intro */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-bebas text-5xl text-white tracking-wider">
          RIDE MILES & REWARDS
        </h1>
        <div className="h-1.5 w-24 bg-brandRed mx-auto rounded"></div>
        <p className="text-sm text-slate-400 font-sans pt-2">
          Every kilometer counts. Rack up ride miles to level up your badges, and convert your active participation points into premium club goodies and ride passes.
        </p>
      </section>

      {/* Progress Meter Segment */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/35 p-6 sm:p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-oswald text-lg font-bold uppercase tracking-wider text-slate-200">
              {user ? `Rider Progress: ${user.name}` : 'Rider Milestone Tracker'}
            </h3>
            
            {user ? (
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Current Distance: <strong>{currentMiles} KM</strong></span>
                  <span>Next Milestone: <strong>{nextMilestone.km} KM ({nextMilestone.badge})</strong></span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-brandRed via-brandOrange to-brandGold h-full rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                
                <p className="text-xs text-slate-400">
                  You need <strong>{nextMilestone.km - currentMiles} more KMs</strong> to earn your <strong>{nextMilestone.badge}</strong> badge!
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect your account and submit your odometer logs after rides. As you pass kilometer milestones, you will automatically unlock verified certificates and rank badges.
              </p>
            )}

            <div className="pt-2 flex gap-4 text-xs font-semibold">
              <div className="bg-slate-950 px-4 py-2.5 rounded border border-slate-850">
                <span className="text-slate-500">POINTS BALANCE</span>
                <p className="text-lg font-bold text-brandRed mt-0.5">{user ? user.points : '200'} PTS</p>
              </div>
              <div className="bg-slate-950 px-4 py-2.5 rounded border border-slate-850">
                <span className="text-slate-500">CURRENT BADGE</span>
                <p className="text-lg font-bold text-brandOrange mt-0.5">{user ? (user.badges[user.badges.length - 1] || 'Rookie Rider') : 'Rookie'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-slate-950 border border-slate-850 rounded-lg text-center">
            <Award className="h-14 w-14 text-brandGold stroke-[1.5] animate-bounce" />
            <h4 className="font-oswald text-sm font-bold uppercase tracking-wider text-slate-200 mt-4">Ride Log Verification</h4>
            <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">
              Complete a ride calendar event or submit mileage proof to your Chapter Director to load miles and points.
            </p>
            {user && (
              <button 
                onClick={() => setActiveTab('Dashboard')}
                className="mt-4 flex items-center justify-center space-x-1.5 text-[10px] font-bold uppercase text-brandRed hover:underline"
              >
                <span>Submit Logs</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Mileage Milestones list */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <h3 className="font-oswald text-lg font-bold uppercase tracking-wider text-slate-200 text-center">Milestone Legend Tiers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {milestones.map((m, idx) => {
            const isCompleted = currentMiles >= m.km
            return (
              <div 
                key={idx}
                className={`rounded-lg border p-5 space-y-3 transition-colors ${
                  isCompleted 
                    ? 'border-brandOrange/40 bg-brandOrange/5' 
                    : 'border-slate-805 bg-slate-900/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bebas text-lg font-bold text-slate-100">{m.km} KM</span>
                  {isCompleted && (
                    <span className="rounded bg-brandOrange/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brandOrange">
                      Unlocked
                    </span>
                  )}
                </div>
                <h4 className="font-oswald text-sm font-bold uppercase text-slate-200">{m.badge}</h4>
                <p className="text-[10px] leading-relaxed text-slate-400">{m.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Rewards Catalog Shop */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-bebas text-3xl text-white tracking-wider">REWARDS STORE</h2>
          <p className="text-xs text-slate-500 mt-1">Convert your riding loyalty points into premium hardware vouchers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rewardsCatalog.map((reward) => {
            const Icon = reward.icon
            const canAfford = user ? user.points >= reward.cost : true
            
            return (
              <div 
                key={reward.id}
                className="rounded-xl border border-slate-805 bg-slate-900/40 p-6 flex flex-col justify-between hover:border-slate-800 transition-colors"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div className="rounded bg-slate-950 p-2.5 text-brandRed border border-slate-850">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-bebas text-lg font-bold text-brandRed">{reward.cost} PTS</span>
                  </div>

                  <h3 className="font-oswald text-sm font-bold uppercase text-slate-200 mt-4 tracking-wide line-clamp-1">
                    {reward.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {reward.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-805 mt-6">
                  {user ? (
                    <button 
                      onClick={() => handleClaim(reward.title, reward.cost)}
                      disabled={!canAfford}
                      className={`w-full rounded py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                        canAfford 
                          ? 'bg-brandRed text-white hover:bg-red-750' 
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Redeem Voucher' : 'Not Enough Points'}
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="w-full rounded bg-slate-800 py-2 text-xs font-bold uppercase text-slate-500"
                    >
                      Login to Redeem
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
