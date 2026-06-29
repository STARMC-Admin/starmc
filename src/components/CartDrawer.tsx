'use client'

import React from 'react'
import { useStarMc } from '@/context/StarMcContext'
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  onOpenAuth: () => void
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onOpenAuth }) => {
  const { cart, removeFromCart, placeOrder, user, activeTab, setActiveTab } = useStarMc()

  if (!isOpen) return null

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const pointsEarned = Math.floor(subtotal / 10)

  const handleCheckout = () => {
    if (!user) {
      onOpenAuth()
      return
    }
    placeOrder()
    onClose()
    setActiveTab('Dashboard')
    // Scroll to dashboard top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-slate-900 border-l border-slate-800 text-slate-100 shadow-2xl transition-all duration-300">
          <div className="flex h-full flex-col justify-between">
            {/* Header */}
            <div className="border-b border-slate-800 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-brandRed" />
                <h2 className="font-oswald text-lg font-bold uppercase tracking-wider text-white">Your Saddlebag</h2>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content / Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-16 w-16 text-slate-700 stroke-[1.5] mb-4" />
                  <p className="text-slate-400 font-medium">Your saddlebag is empty.</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-[240px]">Browse the store to load it with premium riding gear and official merchandise.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div key={`${item.product.id}-${item.size || idx}`} className="flex items-center space-x-4 border-b border-slate-800/60 pb-4">
                      {/* Product Image */}
                      <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        className="h-16 w-16 rounded object-cover border border-slate-800 bg-slate-950"
                      />
                      
                      {/* Product details */}
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-200 line-clamp-1">{item.product.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-slate-400">Qty: {item.quantity}</span>
                          {item.size && (
                            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-slate-300">
                              Size: {item.size}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-bold text-brandRed mt-1">₹{item.product.price.toLocaleString('en-IN')}</p>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-slate-500 hover:text-brandRed transition-colors p-1.5 rounded hover:bg-slate-800/40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="border-t border-slate-800 bg-slate-950 px-6 py-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-bold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="rounded bg-brandOrange/10 border border-brandOrange/25 p-3 flex justify-between items-center text-xs">
                  <span className="text-brandOrange font-semibold">Reward Points Earned</span>
                  <span className="font-bold text-brandOrange">+{pointsEarned} Points</span>
                </div>

                <div className="text-[11px] text-slate-500 text-center">
                  * Razorpay gateway will be simulated. All checkouts are immediate for testing.
                </div>

                <button 
                  onClick={handleCheckout}
                  className="flex w-full items-center justify-center rounded bg-brandRed py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-brandRed/20 transition-all hover:bg-red-700 hover:shadow-brandRed/40 active:scale-98"
                >
                  {user ? 'Simulate Razorpay & Checkout' : 'Login to Complete Checkout'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
