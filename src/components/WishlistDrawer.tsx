'use client'

import React from 'react'
import { useStarMc, Product } from '@/context/StarMcContext'
import { X, Heart, ShoppingCart } from 'lucide-react'

interface WishlistDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose }) => {
  const { wishlist, products, toggleWishlist, addToCart } = useStarMc()

  if (!isOpen) return null

  const wishlistProducts = products.filter(p => wishlist.includes(p.id))

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1, 'M') // default size M for test
    toggleWishlist(product.id) // remove from wishlist
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
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b border-slate-800 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-brandRed fill-brandRed" />
                <h2 className="font-oswald text-lg font-bold uppercase tracking-wider text-white">Your Wishlist</h2>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content / Wishlist Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {wishlistProducts.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Heart className="h-16 w-16 text-slate-700 stroke-[1.5] mb-4" />
                  <p className="text-slate-400 font-medium">Your wishlist is empty.</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-[240px]">Save premium riding products here for future journeys.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-4 border-b border-slate-800/60 pb-4">
                      {/* Product Image */}
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="h-16 w-16 rounded object-cover border border-slate-800 bg-slate-950"
                      />
                      
                      {/* Details */}
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-200 line-clamp-1">{product.title}</h4>
                        <p className="text-sm font-bold text-slate-300 mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col space-y-1.5">
                        <button 
                          onClick={() => handleMoveToCart(product)}
                          className="flex items-center justify-center rounded bg-slate-800 p-2 text-xs font-semibold text-white hover:bg-brandRed transition-colors"
                          title="Add to saddlebag"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className="flex items-center justify-center rounded bg-slate-800/40 p-2 text-xs font-semibold text-slate-400 hover:text-brandRed transition-colors"
                          title="Remove from wishlist"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
