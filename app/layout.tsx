import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/providers/auth-provider"
import { BookingProvider } from "@/components/providers/booking-provider"
import { ToastProvider } from "@/components/providers/toast-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: "Aga Game - PlayStation Booking",
  description: "Booking PlayStation terbaik dengan fasilitas lengkap",
  generator: "Aga",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="aga-game-theme">
          <ToastProvider>
            <AuthProvider>
              <BookingProvider>
                <div className="min-h-screen flex flex-col">
                  {children}
                </div>
              </BookingProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
