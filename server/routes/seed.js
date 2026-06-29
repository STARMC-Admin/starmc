const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const Ride = require('../models/Ride')
const Product = require('../models/Product')
const Chapter = require('../models/Chapter')
const User = require('../models/User')

const DEFAULT_RIDES = [
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
    rideCaptain: "Rohan D'Souza",
    adventure: false,
    weekend: true,
    description: 'Cruise along the scenic Konkan highway to the sandy beaches of Goa. Relaxed riding, beautiful beach sunsets, coastal cuisine, and absolute brotherhood.',
    routeMapUrl: 'https://maps.google.com/?q=Mumbai+to+Goa',
    schedule: [
      { time: '05:00 AM', activity: "Assemble at Kalamboli McDonald's" },
      { time: '08:30 AM', activity: 'Breakfast at Mahad' },
      { time: '01:30 PM', activity: 'Lunch stop at Chiplun' },
      { time: '06:00 PM', activity: "Reach Hotel in Vagator, Goa for Rider's Meet" }
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

const DEFAULT_PRODUCTS = [
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

const DEFAULT_CHAPTERS = [
  { state: 'Karnataka', director: 'Aditya Hegde', email: 'director.kar@starmc.in', phone: '+91-9886012345', memberCount: 1450, establishedDate: '2019-04-12' },
  { state: 'Maharashtra', director: 'Sanjay More', email: 'director.mah@starmc.in', phone: '+91-9820054321', memberCount: 1820, establishedDate: '2019-06-20' },
  { state: 'Delhi NCR', director: 'Harpreet Singh', email: 'director.del@starmc.in', phone: '+91-9811098765', memberCount: 1210, establishedDate: '2020-01-15' },
  { state: 'Tamil Nadu', director: 'Meera Krishnan', email: 'director.tn@starmc.in', phone: '+91-9444065432', memberCount: 950, establishedDate: '2020-08-11' },
  { state: 'Rajasthan', director: 'Rajveer Shekhawat', email: 'director.raj@starmc.in', phone: '+91-9829033445', memberCount: 780, establishedDate: '2021-03-05' },
  { state: 'Goa', director: 'Rohan D\'Souza', email: 'director.goa@starmc.in', phone: '+91-9822156789', memberCount: 420, establishedDate: '2021-11-22' }
]

router.get('/', async (req, res, next) => {
  try {
    // 1. Clear database
    await Ride.deleteMany({})
    await Product.deleteMany({})
    await Chapter.deleteMany({})
    await User.deleteMany({})

    // 2. Insert rides
    await Ride.insertMany(DEFAULT_RIDES)

    // 3. Insert products
    await Product.insertMany(DEFAULT_PRODUCTS)

    // 4. Insert chapters
    await Chapter.insertMany(DEFAULT_CHAPTERS)

    // 5. Insert leaderboard and default users
    const salt = await bcrypt.genSalt(10)
    const adminPasswordHash = await bcrypt.hash('admin123', salt)
    const userPasswordHash = await bcrypt.hash('user123', salt)

    const seedUsers = [
      {
        name: 'Club Administrator',
        email: 'admin@starmc.in',
        passwordHash: adminPasswordHash,
        role: 'ADMIN',
        membership: 'Premium',
        digitalCardId: 'STAR-ADMIN-999',
        points: 9999,
        miles: 100000,
        badges: ['Club Pioneer', 'Master Marshal'],
        registeredRides: [],
        achievements: ['Admin Dashboard Enabled', 'Club Founder'],
        chapter: 'Delhi NCR',
        motorcycle: 'Honda Africa Twin'
      },
      {
        name: 'Ishaan Sharma',
        email: 'ishaan@starmc.in',
        passwordHash: userPasswordHash,
        role: 'USER',
        membership: 'Premium',
        digitalCardId: 'STAR-IND-1804',
        points: 1250,
        miles: 4800,
        badges: ['Road Runner', 'Night Rider'],
        registeredRides: [2],
        achievements: ['First 1000 KM', 'Coast Cruiser', 'Early Adopter'],
        chapter: 'Karnataka',
        motorcycle: 'KTM Adventure 390'
      },
      {
        name: 'Ritesh Deshmukh',
        email: 'ritesh@starmc.in',
        passwordHash: userPasswordHash,
        role: 'USER',
        membership: 'Premium',
        digitalCardId: 'STAR-IND-1111',
        points: 24450,
        miles: 48900,
        badges: ['Interstellar Legend', 'Highway Star'],
        registeredRides: [],
        achievements: [],
        chapter: 'Maharashtra',
        motorcycle: 'Suzuki Hayabusa'
      },
      {
        name: 'Karan Johar',
        email: 'karan@starmc.in',
        passwordHash: userPasswordHash,
        role: 'USER',
        membership: 'Premium',
        digitalCardId: 'STAR-IND-2222',
        points: 17800,
        miles: 35600,
        badges: ['Supernova', 'Asphalt Nomad'],
        registeredRides: [],
        achievements: [],
        chapter: 'Maharashtra',
        motorcycle: 'Triumph Tiger 900'
      },
      {
        name: 'Pooja Hegde',
        email: 'pooja@starmc.in',
        passwordHash: userPasswordHash,
        role: 'USER',
        membership: 'Premium',
        digitalCardId: 'STAR-IND-3333',
        points: 15600,
        miles: 31200,
        badges: ['Supernova'],
        registeredRides: [],
        achievements: [],
        chapter: 'Karnataka',
        motorcycle: 'Ducati Multistrada V4'
      },
      {
        name: 'Sunil Chetri',
        email: 'sunil@starmc.in',
        passwordHash: userPasswordHash,
        role: 'USER',
        membership: 'Premium',
        digitalCardId: 'STAR-IND-4444',
        points: 14200,
        miles: 28400,
        badges: ['Highway Star'],
        registeredRides: [],
        achievements: [],
        chapter: 'Delhi NCR',
        motorcycle: 'BMW R1250 GS'
      },
      {
        name: 'Arjun Rampal',
        email: 'arjun@starmc.in',
        passwordHash: userPasswordHash,
        role: 'USER',
        membership: 'Premium',
        digitalCardId: 'STAR-IND-5555',
        points: 12250,
        miles: 24500,
        badges: ['Highway Star'],
        registeredRides: [],
        achievements: [],
        chapter: 'Maharashtra',
        motorcycle: 'Harley Davidson Pan America'
      },
      {
        name: 'Mary Kom',
        email: 'mary@starmc.in',
        passwordHash: userPasswordHash,
        role: 'USER',
        membership: 'Standard',
        digitalCardId: 'STAR-IND-6666',
        points: 8250,
        miles: 16500,
        badges: ['Asphalt Nomad'],
        registeredRides: [],
        achievements: [],
        chapter: 'Delhi NCR',
        motorcycle: 'Royal Enfield Himalayan 450'
      }
    ]

    await User.insertMany(seedUsers)

    return res.json({ success: true, message: 'Database seeded successfully' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
