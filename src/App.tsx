import React, { useState } from 'react'
import { useStarMc } from '@/context/StarMcContext'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { WishlistDrawer } from '@/components/WishlistDrawer'
import { AuthModal } from '@/components/AuthModal'

// Page Components
import { Home } from '@/components/pages/Home'
import { About } from '@/components/pages/About'
import { Membership } from '@/components/pages/Membership'
import { Rides } from '@/components/pages/Rides'
import { Rewards } from '@/components/pages/Rewards'
import { Merchandise } from '@/components/pages/Merchandise'
import { Chapters } from '@/components/pages/Chapters'
import { Events } from '@/components/pages/Events'
import { Gallery } from '@/components/pages/Gallery'
import { Blog } from '@/components/pages/Blog'
import { Contact } from '@/components/pages/Contact'
import { Dashboard } from '@/components/pages/Dashboard'
import { AdminDashboard } from '@/components/pages/AdminDashboard'

export default function App() {
  const { activeTab } = useStarMc()
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  // Render active page component based on context state
  const renderActivePage = () => {
    switch (activeTab) {
      case 'Home':
        return <Home />
      case 'About':
        return <About />
      case 'Membership':
        return <Membership onOpenAuth={() => setAuthOpen(true)} />
      case 'Rides':
        return <Rides onOpenAuth={() => setAuthOpen(true)} />
      case 'Rewards':
        return <Rewards />
      case 'Merchandise':
        return <Merchandise />
      case 'Chapters':
        return <Chapters />
      case 'Events':
        return <Events />
      case 'Gallery':
        return <Gallery />
      case 'Blog':
        return <Blog />
      case 'Contact':
        return <Contact />
      case 'Dashboard':
        return <Dashboard />
      case 'AdminDashboard':
        return <AdminDashboard />
      default:
        return <Home />
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-between">
      {/* Top Navbar */}
      <Navbar 
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
      />

      {/* Main viewport */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Saddlebag Cart Drawer Overlay */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        onOpenAuth={() => setAuthOpen(true)}
      />

      {/* Wishlist Drawer Overlay */}
      <WishlistDrawer 
        isOpen={wishlistOpen} 
        onClose={() => setWishlistOpen(false)} 
      />

      {/* Authentication Gateway Modal Overlay */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
      />
    </div>
  )
}
