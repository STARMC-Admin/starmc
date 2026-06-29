'use client'

import React, { useState } from 'react'
import { useStarMc, Product } from '@/context/StarMcContext'
import { Heart, ShoppingBag, Star, Info, MessageSquare } from 'lucide-react'

export const Merchandise: React.FC = () => {
  const { products, cart, wishlist, toggleWishlist, addToCart } = useStarMc()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeProductDetails, setActiveProductDetails] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('M')

  const categories = ['All', 'Apparel', 'Accessories', 'Gear']

  // Category mapping helper
  const mapProductToGeneralCategory = (cat: string) => {
    const uppercase = cat.toLowerCase()
    if (uppercase === 't-shirts' || uppercase === 'hoodies' || uppercase === 'caps') return 'Apparel'
    if (uppercase === 'jackets') return 'Gear'
    return 'Accessories' // Coffee mugs, water flasks, decals, membership kits
  }

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'All') return true
    return mapProductToGeneralCategory(product.category) === selectedCategory
  })

  const handleAddToCart = (product: Product, sizeNeeded: boolean) => {
    addToCart(product, 1, sizeNeeded ? selectedSize : undefined)
    alert(`Added "${product.title}" (${sizeNeeded ? selectedSize : 'Free Size'}) to your saddlebag!`)
  }

  const isProductApparelOrGear = (category: string) => {
    const lowercase = category.toLowerCase()
    return lowercase === 't-shirts' || lowercase === 'hoodies' || lowercase === 'jackets'
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 pb-20">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-bebas text-5xl text-white tracking-wider">
          OFFICIAL MERCHANDISE
        </h1>
        <div className="h-1.5 w-24 bg-brandRed mx-auto rounded"></div>
        <p className="text-sm text-slate-400 font-sans pt-2">
          Gear up for the highway. Grab official high-grade CE protective riding jackets, pure combed cotton t-shirts, flasks, and decals.
        </p>
      </section>

      {/* Category Toggles */}
      <section className="flex justify-center space-x-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === cat 
                ? 'bg-brandRed text-white shadow-md shadow-brandRed/20' 
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-805'
            }`}
          >
            {cat === 'All' ? 'All Products' : cat}
          </button>
        ))}
      </section>

      {/* Product Grid */}
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map(product => {
          const isWishlisted = wishlist.includes(product.id)
          const needsSize = isProductApparelOrGear(product.category)
          
          return (
            <div 
              key={product.id}
              className="rounded-xl border border-slate-805 bg-slate-900/40 overflow-hidden flex flex-col justify-between hover:border-brandRed/35 transition-all duration-300 group"
            >
              <div>
                {/* Image */}
                <div className="h-64 relative bg-slate-950 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Wishlist Action */}
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 rounded-full bg-slate-950/60 p-2 text-slate-300 hover:text-brandRed transition-colors"
                  >
                    <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'text-brandRed fill-brandRed' : 'text-slate-350'}`} />
                  </button>
                  {/* Category marker */}
                  <span className="absolute bottom-3 left-3 rounded bg-slate-900/90 backdrop-blur-sm border border-slate-800 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brandOrange">
                    {product.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3.5">
                  <h3 className="font-oswald text-base font-bold uppercase text-slate-200 tracking-wide line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-brandGold font-semibold">
                    <Star className="h-4 w-4 fill-brandGold text-brandGold" />
                    <span>{product.rating} / 5.0</span>
                    <span className="text-slate-500 font-medium">({product.reviews.length} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Action and Pricing */}
              <div className="border-t border-slate-805 bg-slate-950/20 px-6 py-4 flex items-center justify-between">
                <span className="font-bebas text-lg font-bold text-white">₹{product.price.toLocaleString('en-IN')}</span>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setActiveProductDetails(product)}
                    className="rounded-full bg-slate-800 p-2 text-slate-400 hover:text-white transition-colors"
                    title="Product Specifications"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleAddToCart(product, needsSize)}
                    className="flex items-center space-x-1.5 rounded-full bg-brandRed px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-750 transition-colors shadow shadow-brandRed/20"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* DETAIL SPECS MODAL */}
      {activeProductDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setActiveProductDetails(null)} />
          
          <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl border border-slate-850 bg-slate-900 text-left text-slate-200 shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Image */}
              <div className="h-64 md:h-full relative bg-slate-950">
                <img 
                  src={activeProductDetails.image} 
                  alt={activeProductDetails.title} 
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Right specs */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-brandOrange/10 border border-brandOrange/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brandOrange">
                      {activeProductDetails.category}
                    </span>
                    <button 
                      onClick={() => setActiveProductDetails(null)}
                      className="text-slate-450 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="font-oswald text-lg font-bold uppercase text-white mt-4 tracking-wide">
                    {activeProductDetails.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mt-3">
                    {activeProductDetails.description}
                  </p>

                  {/* Size Selector if Apparel */}
                  {isProductApparelOrGear(activeProductDetails.category) && (
                    <div className="mt-5 space-y-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Select Size</label>
                      <div className="flex space-x-2">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`h-8 w-8 rounded text-xs font-bold border transition-colors ${
                              selectedSize === sz 
                                ? 'bg-brandRed text-white border-brandRed' 
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reviews */}
                  <div className="mt-6 space-y-3">
                    <h4 className="font-oswald text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center">
                      <MessageSquare className="mr-1.5 h-4 w-4" /> Rider Reviews ({activeProductDetails.reviews.length})
                    </h4>
                    {activeProductDetails.reviews.length === 0 ? (
                      <p className="text-[10px] text-slate-500 italic">No reviews yet for this product.</p>
                    ) : (
                      <div className="space-y-2 max-h-24 overflow-y-auto pr-2">
                        {activeProductDetails.reviews.map((r, i) => (
                          <div key={i} className="text-[10px] bg-slate-950/40 p-2 rounded border border-slate-850">
                            <div className="flex justify-between font-bold text-slate-350">
                              <span>{r.author}</span>
                              <span className="text-brandGold">★ {r.rating}</span>
                            </div>
                            <p className="text-slate-450 mt-1 italic">&quot;{r.comment}&quot;</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-805 pt-4 flex items-center justify-between">
                  <span className="font-bebas text-2xl font-bold text-white">₹{activeProductDetails.price.toLocaleString('en-IN')}</span>
                  
                  <button
                    onClick={() => {
                      handleAddToCart(activeProductDetails, isProductApparelOrGear(activeProductDetails.category));
                      setActiveProductDetails(null);
                    }}
                    className="flex items-center space-x-1.5 rounded bg-brandRed px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-750 transition-colors shadow shadow-brandRed/20"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
