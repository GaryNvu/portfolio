import { Geist, Montserrat } from 'next/font/google'

export const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
  })

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
