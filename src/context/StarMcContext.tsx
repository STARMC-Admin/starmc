'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface UserSession {
  name: string
  email: string
  membership: 'Standard' | 'Premium' | null
  digitalCardId: string
  points: number
  miles: number
  badges: string[]
  registeredRides: number[]
  orders: any[]
  achievements: string[]
  chapter: string
  motorcycle: string
  role?: 'USER' | 'ADMIN'
}

export interface Ride {
  id: number
  title: string
  date: string
  location: string
  state: string
  difficulty: 'Easy' | 'Moderate' | 'Hard'
  distance: number // in KM
  duration: string // e.g. "3 Days"
  rideCaptain: string
  adventure: boolean
  weekend: boolean
  description: string
  routeMapUrl: string
  schedule: { time: string; activity: string }[]
  meetingPoint: string
  fuelStops: string[]
  breakfastStop: string
  lunchStop: string
  emergencyContacts: string[]
  weather: string
  gallery: string[]
}

export interface Product {
  id: number
  title: string
  category: string
  price: number
  rating: number
  reviews: { author: string; comment: string; rating: number }[]
  image: string
  description: string
  inStock: boolean
}

export interface Chapter {
  state: string
  director: string
  email: string
  phone: string
  memberCount: number
  establishedDate: string
}

export interface LeaderboardEntry {
  name: string
  motorcycle: string
  km: number
  rides: number
  volunteering: number
  referrals: number
  badge: string
}

export interface RideVerification {
  id: number
  userName: string
  userEmail: string
  rideTitle: string
  date: string
  distance: number
  proofUrl: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

interface StarMcContextType {
  user: UserSession | null
  rides: Ride[]
  products: Product[]
  chapters: Chapter[]
  leaderboard: LeaderboardEntry[]
  verifications: RideVerification[]
  cart: { product: Product; quantity: number; size?: string }[]
  wishlist: number[]
  activeTab: string
  setActiveTab: (tab: string) => void
  login: (email: string, method: string) => Promise<boolean>
  logout: () => void
  registerUser: (name: string, email: string, password: string, motorcycle: string, chapter: string) => Promise<boolean>
  buyMembership: (type: 'Standard' | 'Premium') => void
  registerForRide: (rideId: number) => Promise<boolean>
  addRideVerification: (rideTitle: string, distance: number, proofUrl: string) => void
  approveVerification: (id: number) => void
  rejectVerification: (id: number) => void
  addNewRide: (ride: Omit<Ride, 'id' | 'gallery' | 'routeMapUrl' | 'weather'>) => void
  addToCart: (product: Product, quantity: number, size?: string) => void
  removeFromCart: (productId: number, size?: string) => void
  clearCart: () => void
  toggleWishlist: (productId: number) => void
  placeOrder: () => void
  claimReward: (rewardName: string, pointsCost: number) => Promise<boolean>
}

const StarMcContext = createContext<StarMcContextType | undefined>(undefined)

const DEFAULT_RIDES: Ride[] = [
  {
    id: 1,
    title: 'Ladakh Conquerors Expedition',
    date: '2026-07-15',
    location: 'Leh to Nubra Valley',
    state: 'Ladakh',
    difficulty: 'Hard',
    distance: 1200,
    duration: '10 Days',
    rideCaptain: 'Vikram Rathore',
    adventure: true,
    weekend: false,
    description: 'Conquer the highest motorable passes in the world. Traverse Khardung La, Chang La, and witness the breathtaking Pangong Tso. A test of skill, endurance, and spirit.',
    routeMapUrl: 'https://maps.google.com/?q=Leh+to+Nubra+Valley',
    schedule: [
      { time: 'Day 1', activity: 'Arrival in Leh & acclimatization briefing' },
      { time: 'Day 2', activity: 'Local ride around Leh, magnetic hill exploration' },
      { time: 'Day 3', activity: 'Leh to Nubra Valley via Khardung La Pass' },
      { time: 'Day 4', activity: 'Nubra Valley exploration, sand dunes & camel ride' },
      { time: 'Day 5', activity: 'Nubra to Pangong Tso via Shyok route' },
      { time: 'Day 6', activity: 'Sunrise at Pangong, ride back to Leh' },
      { time: 'Day 7', activity: 'Leh to Tso Moriri lake' },
      { time: 'Day 8', activity: 'Explore Tso Moriri, ride back to Leh' },
      { time: 'Day 9', activity: 'Rest day, shopping, certificate distribution ceremony' },
      { time: 'Day 10', activity: 'Departure from Leh' }
    ],
    meetingPoint: 'Leh Club House near Shanti Stupa, 07:00 AM',
    fuelStops: ['Leh City Fuel Outlet', 'Karoo HP Gas', 'Diskit Valley Center'],
    breakfastStop: 'Khardung La Cafe (Highest Tea Point)',
    lunchStop: 'Hunder Oasis Kitchen',
    emergencyContacts: ['Army Transit Camp Hospital: +91-1982-252012', 'Ladakh Rescue Service: +91-1982-100'],
    weather: 'Clear mornings (-2°C to 15°C), high wind warnings in afternoons',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 2,
    title: 'Goa Coastal Cruise',
    date: '2026-08-08',
    location: 'Mumbai to Vagator',
    state: 'Goa',
    difficulty: 'Easy',
    distance: 600,
    duration: '3 Days',
    rideCaptain: 'Rohan D\'Souza',
    adventure: false,
    weekend: true,
    description: 'Cruise along the scenic Konkan highway to the sandy beaches of Goa. Relaxed riding, beautiful beach sunsets, coastal cuisine, and absolute brotherhood.',
    routeMapUrl: 'https://maps.google.com/?q=Mumbai+to+Goa',
    schedule: [
      { time: '05:00 AM', activity: 'Assemble at Kalamboli McDonald\'s' },
      { time: '08:30 AM', activity: 'Breakfast at Mahad' },
      { time: '01:30 PM', activity: 'Lunch stop at Chiplun' },
      { time: '06:00 PM', activity: 'Reach Hotel in Vagator, Goa for Rider\'s Meet' }
    ],
    meetingPoint: 'McDonalds Kalamboli, Navi Mumbai, 04:30 AM',
    fuelStops: ['Kolhapur Toll plaza outlet', 'Sawantwadi City Fuel Center'],
    breakfastStop: 'Hotel Visawa, Mahad',
    lunchStop: 'Riverview Resort, Chiplun',
    emergencyContacts: ['Konkan Highway Helpline: 1033', 'Goa Emergency Center: 108'],
    weather: 'Warm and Humid (28°C to 34°C) with occasional monsoon drizzles',
    gallery: [
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 3,
    title: 'Western Ghats Forest Odyssey',
    date: '2026-09-12',
    location: 'Bengaluru to Chikmagalur',
    state: 'Karnataka',
    difficulty: 'Moderate',
    distance: 320,
    duration: '2 Days',
    rideCaptain: 'Aditya Hegde',
    adventure: true,
    weekend: true,
    description: 'Wind through coffee estates, rain forest routes, and climbing curves of Mullayanagiri. A green treat with misty twists and curves.',
    routeMapUrl: 'https://maps.google.com/?q=Bengaluru+to+Chikmagalur',
    schedule: [
      { time: '06:00 AM', activity: 'Assemble at Nelamangala Toll plaza' },
      { time: '08:00 AM', activity: 'Breakfast at Kunigal' },
      { time: '12:30 PM', activity: 'Arrive at Chikmagalur coffee homestay' },
      { time: '03:30 PM', activity: 'Ride up to Mullayanagiri Peak for sunset view' }
    ],
    meetingPoint: 'Nelamangala Toll Gate, Bengaluru, 05:30 AM',
    fuelStops: ['Hassan Bypass HP Petrol pump'],
    breakfastStop: 'Swathi Delicacy, Kunigal',
    lunchStop: 'Siri Nature Cafe, Chikmagalur',
    emergencyContacts: ['Karnataka Highway Police: +91-80-22211777'],
    weather: 'Misty and Cool (18°C to 24°C) with high chances of fog',
    gallery: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 4,
    title: 'Rajputana Fort & Heritage Trail',
    date: '2026-10-18',
    location: 'Jaipur to Jaisalmer',
    state: 'Rajasthan',
    difficulty: 'Moderate',
    distance: 650,
    duration: '4 Days',
    rideCaptain: 'Kabir Singh',
    adventure: false,
    weekend: false,
    description: 'Ride across open desert highways, visiting the majestic forts of Jodhpur and ending with camping in the golden sand dunes of Jaisalmer.',
    routeMapUrl: 'https://maps.google.com/?q=Jaipur+to+Jaisalmer',
    schedule: [
      { time: 'Day 1', activity: 'Jaipur to Jodhpur (340 KM) - Fort dinner' },
      { time: 'Day 2', activity: 'Explore Mehrangarh Fort, ride Jodhpur to Jaisalmer (290 KM)' },
      { time: 'Day 3', activity: 'Dune riding and desert camping, folk musical night' },
      { time: 'Day 4', activity: 'Return ride back to Jaipur' }
    ],
    meetingPoint: 'Albert Hall Museum Gate, Jaipur, 05:30 AM',
    fuelStops: ['Ajmer Bypass Outlet', 'Pokhran Fuel Depot'],
    breakfastStop: 'Hotel Highway King, Bagru',
    lunchStop: 'Pokhran Midway Resort',
    emergencyContacts: ['Rajasthan Tourist Police helpline: 112'],
    weather: 'Dry and Sunny (32°C day, 16°C night)',
    gallery: [
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=800'
    ]
  }
]

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'STARMC Premium Ride Jacket',
    category: 'Jackets',
    price: 8499,
    rating: 4.8,
    reviews: [
      { author: 'Amit K.', comment: 'High quality armor protection. Fully waterproof!', rating: 5 },
      { author: 'Rahul S.', comment: 'Great fit and ventilation. Red piping looks awesome.', rating: 4 }
    ],
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
    description: 'All-season premium riding jacket with CE Level 2 armor protection, mesh ventilation, and reflective branding.',
    inStock: true
  },
  {
    id: 2,
    title: 'STARMC "Ride Together" T-Shirt',
    category: 'T-Shirts',
    price: 799,
    rating: 4.6,
    reviews: [
      { author: 'Vijay P.', comment: 'Super soft cotton. Graphic print quality is superb.', rating: 5 }
    ],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600',
    description: '100% pure combed cotton crew neck t-shirt. Features the signature STARMC slogan on the back.',
    inStock: true
  },
  {
    id: 3,
    title: 'STARMC Matte Black Helmet Cap',
    category: 'Caps',
    price: 499,
    rating: 4.5,
    reviews: [],
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&q=80&w=600',
    description: 'Comfortable sweat-wicking base cap. Perfect for keeping messy hair neat after removing your helmet.',
    inStock: true
  },
  {
    id: 4,
    title: 'STARMC Insulated Water Flask',
    category: 'Water Bottles',
    price: 1299,
    rating: 4.9,
    reviews: [
      { author: 'Sneha M.', comment: 'Keeps water chilled even after hours of riding in hot sun!', rating: 5 }
    ],
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600',
    description: 'Double-walled stainless steel flask. Keeps liquids hot for 12 hours and cold for 24 hours. Engraved Logo.',
    inStock: true
  },
  {
    id: 5,
    title: 'STARMC Embroidered Sleeve Hoodie',
    category: 'Hoodies',
    price: 2499,
    rating: 4.7,
    reviews: [],
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
    description: 'Warm and stylish hoodie. Features red embroideries and premium zipper. Perfect for chilly morning ride starts.',
    inStock: true
  },
  {
    id: 6,
    title: 'Official STARMC Membership Kit',
    category: 'Membership Kits',
    price: 1499,
    rating: 4.9,
    reviews: [],
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    description: 'Contains Welcome Letter, Metal Keyring, Premium Ride Decals, Fabric Chapter Patch, and Ride Logbook.',
    inStock: true
  }
]

const DEFAULT_CHAPTERS: Chapter[] = [
  { state: 'Karnataka', director: 'Aditya Hegde', email: 'director.kar@starmc.in', phone: '+91-9886012345', memberCount: 1450, establishedDate: '2019-04-12' },
  { state: 'Maharashtra', director: 'Sanjay More', email: 'director.mah@starmc.in', phone: '+91-9820054321', memberCount: 1820, establishedDate: '2019-06-20' },
  { state: 'Delhi NCR', director: 'Harpreet Singh', email: 'director.del@starmc.in', phone: '+91-9811098765', memberCount: 1210, establishedDate: '2020-01-15' },
  { state: 'Tamil Nadu', director: 'Meera Krishnan', email: 'director.tn@starmc.in', phone: '+91-9444065432', memberCount: 950, establishedDate: '2020-08-11' },
  { state: 'Rajasthan', director: 'Rajveer Shekhawat', email: 'director.raj@starmc.in', phone: '+91-9829033445', memberCount: 780, establishedDate: '2021-03-05' },
  { state: 'Goa', director: 'Rohan D\'Souza', email: 'director.goa@starmc.in', phone: '+91-9822156789', memberCount: 420, establishedDate: '2021-11-22' }
]

const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { name: 'Ritesh Deshmukh', motorcycle: 'Suzuki Hayabusa', km: 48900, rides: 112, volunteering: 24, referrals: 15, badge: 'Interstellar Legend' },
  { name: 'Karan Johar', motorcycle: 'Triumph Tiger 900', km: 35600, rides: 88, volunteering: 18, referrals: 10, badge: 'Supernova' },
  { name: 'Pooja Hegde', motorcycle: 'Ducati Multistrada V4', km: 31200, rides: 74, volunteering: 15, referrals: 12, badge: 'Supernova' },
  { name: 'Sunil Chetri', motorcycle: 'BMW R1250 GS', km: 28400, rides: 68, volunteering: 10, referrals: 8, badge: 'Highway Star' },
  { name: 'Arjun Rampal', motorcycle: 'Harley Davidson Pan America', km: 24500, rides: 59, volunteering: 12, referrals: 14, badge: 'Highway Star' },
  { name: 'Mary Kom', motorcycle: 'Royal Enfield Himalayan 450', km: 16500, rides: 42, volunteering: 8, referrals: 6, badge: 'Asphalt Nomad' }
]

export const StarMcProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null)
  const [rides, setRides] = useState<Ride[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [verifications, setVerifications] = useState<RideVerification[]>([])
  const [cart, setCart] = useState<{ product: Product; quantity: number; size?: string }[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<string>('Home')

  // Load state from backend and local storage on mount
  useEffect(() => {
    // 1. Fetch user session
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user)
          // If admin, fetch verifications
          if (data.user.role === 'ADMIN') {
            fetch('/api/verify')
              .then((r) => r.json())
              .then((vData) => {
                if (vData.success) setVerifications(vData.verifications)
              })
          }
        }
      })

    // 2. Fetch rides
    fetch('/api/rides')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRides(data.rides)
      })

    // 3. Fetch products
    fetch('/api/merchandise')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.products)
      })

    // 4. Fetch chapters
    fetch('/api/chapters')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setChapters(data.chapters)
      })

    // 5. Fetch leaderboard
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLeaderboard(data.leaderboard)
      })

    const savedCart = localStorage.getItem('starmc_cart')
    const savedWishlist = localStorage.getItem('starmc_wishlist')

    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  // Sync to local storage helper for cart and wishlist
  const syncCart = (updatedCart: typeof cart) => {
    setCart(updatedCart)
    localStorage.setItem('starmc_cart', JSON.stringify(updatedCart))
  }

  const syncWishlist = (updatedWishlist: number[]) => {
    setWishlist(updatedWishlist)
    localStorage.setItem('starmc_wishlist', JSON.stringify(updatedWishlist))
  }

  // Auth Operations
  const login = async (email: string, method: string): Promise<boolean> => {
    try {
      // Determine default passwords for easy simulation
      let password = 'user123'
      if (email.toLowerCase() === 'admin@starmc.in') {
        password = 'admin123'
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.success) {
        setUser(data.user)
        if (data.user.role === 'ADMIN') {
          const vRes = await fetch('/api/verify')
          const vData = await vRes.json()
          if (vData.success) setVerifications(vData.verifications)
        }
        // Refresh leaderboard since active user changes
        const lRes = await fetch('/api/leaderboard')
        const lData = await lRes.json()
        if (lData.success) setLeaderboard(lData.leaderboard)
        return true
      } else {
        alert(data.error || 'Login failed')
        return false
      }
    } catch (e: any) {
      alert(e.message || 'An error occurred during login')
      return false
    }
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    syncCart([])
  }

  const registerUser = async (name: string, email: string, password: string, motorcycle: string, chapter: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, motorcycle, chapter }),
      })
      const data = await res.json()
      if (data.success) {
        setUser(data.user)
        return true
      } else {
        alert(data.error || 'Registration failed')
        return false
      }
    } catch (e: any) {
      alert(e.message || 'An error occurred during registration')
      return false
    }
  }

  const buyMembership = async (type: 'Standard' | 'Premium') => {
    if (!user) return
    try {
      const res = await fetch('/api/user/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      })
      const data = await res.json()
      if (data.success) {
        setUser(data.user)
        alert(`${type} Membership activated successfully!`)
      } else {
        alert(data.error || 'Failed to activate membership')
      }
    } catch (e: any) {
      alert(e.message || 'An error occurred')
    }
  }

  const registerForRide = async (rideId: number): Promise<boolean> => {
    if (!user) return false
    try {
      const res = await fetch('/api/rides/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rideId }),
      })
      const data = await res.json()
      if (data.success) {
        setUser(data.user)
        return true
      } else {
        alert(data.error || 'Registration failed')
        return false
      }
    } catch (e: any) {
      alert(e.message || 'An error occurred during ride registration')
      return false
    }
  }

  const addRideVerification = async (rideTitle: string, distance: number, proofUrl: string) => {
    if (!user) return
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rideTitle, distance, proofUrl }),
      })
      const data = await res.json()
      if (data.success) {
        if (user.role === 'ADMIN') {
          setVerifications([data.verification, ...verifications])
        }
        alert('Verification request submitted successfully for review.')
      } else {
        alert(data.error || 'Failed to submit verification request')
      }
    } catch (e: any) {
      alert(e.message || 'An error occurred')
    }
  }

  const approveVerification = async (id: number) => {
    try {
      const res = await fetch('/api/verify', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'Approved' }),
      })
      const data = await res.json()
      if (data.success) {
        setVerifications(verifications.map((v) => (v.id === id ? { ...v, status: 'Approved' } : v)))
        const meRes = await fetch('/api/auth/me')
        const meData = await meRes.json()
        if (meData.success && meData.user) {
          setUser(meData.user)
        }
        const lRes = await fetch('/api/leaderboard')
        const lData = await lRes.json()
        if (lData.success) setLeaderboard(lData.leaderboard)
      } else {
        alert(data.error || 'Failed to approve verification')
      }
    } catch (e: any) {
      alert(e.message || 'An error occurred')
    }
  }

  const rejectVerification = async (id: number) => {
    try {
      const res = await fetch('/api/verify', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'Rejected' }),
      })
      const data = await res.json()
      if (data.success) {
        setVerifications(verifications.map((v) => (v.id === id ? { ...v, status: 'Rejected' } : v)))
      } else {
        alert(data.error || 'Failed to reject verification')
      }
    } catch (e: any) {
      alert(e.message || 'An error occurred')
    }
  }

  const addNewRide = async (ride: Omit<Ride, 'id' | 'gallery' | 'routeMapUrl' | 'weather'>) => {
    try {
      const res = await fetch('/api/rides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ride),
      })
      const data = await res.json()
      if (data.success) {
        setRides([data.ride, ...rides])
      } else {
        alert(data.error || 'Failed to add ride')
      }
    } catch (e: any) {
      alert(e.message || 'An error occurred')
    }
  }

  const addToCart = (product: Product, quantity: number, size?: string) => {
    const existingIndex = cart.findIndex((c) => c.product.id === product.id && c.size === size)
    if (existingIndex > -1) {
      const updated = [...cart]
      updated[existingIndex].quantity += quantity
      syncCart(updated)
    } else {
      syncCart([...cart, { product, quantity, size }])
    }
  }

  const removeFromCart = (productId: number, size?: string) => {
    const updated = cart.filter((c) => !(c.product.id === productId && c.size === size))
    syncCart(updated)
  }

  const clearCart = () => syncCart([])

  const toggleWishlist = (productId: number) => {
    const updated = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId]
    syncWishlist(updated)
  }

  const placeOrder = async () => {
    if (!user || cart.length === 0) return
    const orderItems = cart.map((c) => `${c.product.title} (${c.size || 'Free Size'}) x${c.quantity}`).join(', ')
    const totalCost = cart.reduce((sum, c) => sum + c.product.price * c.quantity, 0)

    try {
      const res = await fetch('/api/merchandise/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderItems,
          total: totalCost,
          isReward: false,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setUser(data.user)
        clearCart()
        alert('Order placed successfully!')
      } else {
        alert(data.error || 'Failed to place order')
      }
    } catch (e: any) {
      alert(e.message || 'An error occurred while placing order')
    }
  }

  const claimReward = async (rewardName: string, pointsCost: number): Promise<boolean> => {
    if (!user || user.points < pointsCost) return false

    try {
      const res = await fetch('/api/merchandise/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: `Claimed Reward: ${rewardName}`,
          total: `${pointsCost} pts`,
          isReward: true,
          pointsCost,
          rewardName,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setUser(data.user)
        alert(`Reward "${rewardName}" claimed successfully!`)
        return true
      } else {
        alert(data.error || 'Failed to claim reward')
        return false
      }
    } catch (e: any) {
      alert(e.message || 'An error occurred while claiming reward')
      return false
    }
  }

  return (
    <StarMcContext.Provider
      value={{
        user,
        rides,
        products,
        chapters,
        leaderboard,
        verifications,
        cart,
        wishlist,
        activeTab,
        setActiveTab,
        login,
        logout,
        registerUser,
        buyMembership,
        registerForRide,
        addRideVerification,
        approveVerification,
        rejectVerification,
        addNewRide,
        addToCart,
        removeFromCart,
        clearCart,
        toggleWishlist,
        placeOrder,
        claimReward,
      }}
    >
      {children}
    </StarMcContext.Provider>
  )
}

export const useStarMc = () => {
  const context = useContext(StarMcContext)
  if (context === undefined) {
    throw new Error('useStarMc must be used within a StarMcProvider')
  }
  return context
}
