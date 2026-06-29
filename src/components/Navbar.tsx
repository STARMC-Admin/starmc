'use client'

import React, { useState } from 'react'
import { useStarMc } from '@/context/StarMcContext'
import { ShoppingCart, Heart, Menu, X, User, LogOut, LayoutDashboard, Shield } from 'lucide-react'

interface NavbarProps {
  onOpenCart: () => void
  onOpenWishlist: () => void
  onOpenAuth: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart, onOpenWishlist, onOpenAuth }) => {
  const { user, logout, activeTab, setActiveTab, cart, wishlist } = useStarMc()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const navItems = [
    'Home',
    'About',
    'Membership',
    'Rides',
    'Rewards',
    'Merchandise',
    'Chapters',
    'Events',
    'Gallery',
    'Blog',
    'Contact'
  ]

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const wishlistCount = wishlist.length

  const handleNavClick = (tab: string) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setProfileDropdownOpen(false)
    setActiveTab('Home')
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-darkBg/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('Home')}>
            <span className="font-bebas text-3xl font-bold tracking-wider text-white">
              STAR<span className="text-brandRed">MC</span>
            </span>
            <span className="ml-2 hidden text-xs font-semibold uppercase tracking-widest text-slate-400 sm:inline-block">
              India
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:space-x-1 xl:space-x-3">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`px-2 xl:px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:text-brandRed ${
                  activeTab === item
                    ? 'text-brandRed border-b-2 border-brandRed font-bold'
                    : 'text-slate-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-slate-300 hover:text-brandRed transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brandOrange text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-slate-300 hover:text-brandRed transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brandRed text-[9px] font-bold text-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1.5 hover:bg-slate-800 transition-all"
                >
                  <User className="h-4 w-4 text-slate-300" />
                  <span className="hidden max-w-[100px] truncate text-xs font-bold text-slate-200 md:inline-block">
                    {user.name.split(' ')[0]}
                  </span>
                  {user.membership && (
                    <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      user.membership === 'Premium' 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                    }`}>
                      {user.membership}
                    </span>
                  )}
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-slate-800 bg-slate-900 py-1 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="border-b border-slate-800 px-4 py-2.5">
                      <p className="text-xs text-slate-500">Logged in as</p>
                      <p className="truncate text-sm font-bold text-slate-200">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('Dashboard')
                        setProfileDropdownOpen(false)
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <LayoutDashboard className="mr-3 h-4 w-4 text-slate-400" />
                      Member Dashboard
                    </button>

                    {user.email === 'admin@starmc.in' && (
                      <button
                        onClick={() => {
                          setActiveTab('AdminDashboard')
                          setProfileDropdownOpen(false)
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-amber-400 hover:bg-slate-800 hover:text-amber-300"
                      >
                        <Shield className="mr-3 h-4 w-4 text-amber-500" />
                        Admin Panel
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-brandRed hover:bg-slate-800"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="rounded-full bg-brandRed px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brandRed/20 transition-all hover:bg-red-700 hover:shadow-brandRed/45 active:scale-95"
              >
                Join / Sign In
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 lg:hidden hover:text-brandRed"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-850 bg-slate-900/95 backdrop-blur-md lg:hidden">
          <div className="space-y-1 px-2 pb-4 pt-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`block w-full rounded-md px-3 py-2.5 text-left text-sm font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === item
                    ? 'bg-brandRed/10 text-brandRed'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
