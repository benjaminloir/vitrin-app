import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata = {
  title: 'Vitrin | WhatsApp Mağazanızı Oluşturun',
  description: 'Dakikalar içinde kendi dijital vitrininizi oluşturun ve WhatsApp üzerinden sipariş almaya başlayın.',
}

import SideAds from '@/components/SideAds';
import { UserProvider } from '@/context/UserContext'; // Assuming this import is also needed for UserProvider
import { Toaster } from 'react-hot-toast'; // Assuming this import is also needed for Toaster
import { Inter } from 'next/font/google'; // Assuming this import is also needed for inter.className

const inter = Inter({ subsets: ['latin'] }); // Initialize inter font



export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <UserProvider>
            <Navbar />
            <SideAds />
            <main className="min-h-screen pt-20">
              {children}
            </main>
            <Footer />
            <Toaster position="top-center" />
          </UserProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
