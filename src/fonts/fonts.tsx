import { Poppins, Roboto_Mono, Geist, Geist_Mono, Montserrat } from 'next/font/google'
import localFont from 'next/font/local'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
  })

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
  
export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const cascadiaMono = localFont({
  src: '../../public/fonts/Cascadia_Mono/static/CascadiaMono-Regular.ttf',
  variable: '--font-cascadia-mono',
})

export const notoSansMath = localFont({
  src: '../../public/fonts/Noto_Sans_Math/NotoSansMath-Regular.ttf',
  variable: '--font-noto-sans-math',
})