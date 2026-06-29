import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0F172A',
        darkCard: '#1E293B',
        brandRed: '#DC2626',
        brandOrange: '#F97316',
        brandGold: '#EAB308',
        brandSilver: '#94A3B8',
        brandSteel: '#475569',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        bebas: ['var(--font-bebas-neue)', 'sans-serif'],
        oswald: ['var(--font-oswald)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
