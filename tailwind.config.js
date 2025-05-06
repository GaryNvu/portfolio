/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'dark-purple': 'var(--dark-purple)',
        'medium-purple': 'var(--medium-purple)',
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        text: 'var(--text)',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        montserrat: ['var(--font-montserrat)'],
        'roboto-mono': ['var(--font-roboto-mono)'],
        'geist-sans': ['var(--font-geist-sans)'],
        'geist-mono': ['var(--font-geist-mono)'],
        'cascadia-mono': ['var(--font-cascadia-mono)'],
        'noto-math': ['var(--font-noto-sans-math)'],
      },
    },
  },
  plugins: [],
}

