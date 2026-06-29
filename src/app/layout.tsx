import './globals.css'
import type { Metadata } from 'next'
import { Inter, Bebas_Neue, Oswald, Poppins } from 'next/font/google'
import { StarMcProvider } from '@/context/StarMcContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas-neue' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' })
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-poppins' })

export const metadata: Metadata = {
  title: 'STARMC India - Star Motorcycle Club',
  description: 'STARMC (Star Motorcycle Club India) is a premium multi-brand motorcycle riding community for riders across India. Ride Together. Create Memories. Live the Journey.',
  keywords: ['Motorcycle Club India', 'Bike Riding Club', 'Motorcycle Community', 'Group Rides India', 'Motorcycle Events', 'Riding Club Membership'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${oswald.variable} ${poppins.variable}`}>
      <body className="bg-darkBg text-slate-100 font-sans antialiased min-h-screen">
        <StarMcProvider>
          {children}
        </StarMcProvider>
      </body>
    </html>
  )
}
