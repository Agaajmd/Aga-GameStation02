"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"
import { useBooking } from "@/components/providers/booking-provider"
import { useToast } from "@/components/providers/toast-provider"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { cart } = useBooking()
  const { showSuccess } = useToast()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const customerLinks = [
    { href: "/", label: "Beranda" },
    { href: "/booking", label: "Booking" },
    { href: "/promo", label: "Promo" },
    { href: "/riwayat", label: "Riwayat" },
  ]

  const adminLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/booking", label: "Booking" },
    { href: "/admin/ketersediaan", label: "Ketersediaan" },
    { href: "/admin/pelanggan", label: "Pelanggan" },
  ]

  const superAdminLinks = [
    { href: "/super-admin", label: "Dashboard" },
    { href: "/super-admin/admins", label: "Admin" },
    { href: "/super-admin/ps-units", label: "PS Units" },
    { href: "/super-admin/laporan", label: "Laporan" },
  ]

  const getLinks = () => {
    if (!user) return customerLinks
    if (user.role === "admin") return adminLinks
    if (user.role === "super-admin") return superAdminLinks
    return customerLinks
  }

  const handleLogout = () => {
    logout()
    showSuccess("Berhasil logout", "Sampai jumpa lagi!")
    setIsOpen(false)
  }

  const isActiveLink = (href: string) => {
    return pathname === href
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-none">Aga GAME</span>
              <span className="text-xs text-muted-foreground leading-none">Station</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {getLinks().map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-muted-foreground hover:text-primary transition-colors duration-200 pb-1 ${
                  isActiveLink(link.href) ? "nav-link-active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            {!isMobile && <ThemeToggle />}

            {user?.role === "customer" && (
              <Link href="/checkout" className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </Link>
            )}

            {user && !isMobile ? (
              <div className="flex items-center space-x-2">
                <Link href="/profil">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    {user.name}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : !user && !isMobile ? (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="gradient-primary text-white">
                    Daftar
                  </Button>
                </Link>
              </div>
            ) : null}

            {/* Mobile menu button */}
            {isMobile && (
              <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && isMobile && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2 shadow-lg border border-border">
              {getLinks().map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200 rounded-md ${
                    isActiveLink(link.href) ? "bg-primary/10 text-primary font-medium" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-border pt-2 mt-2">
                <ThemeToggle />
              </div>

              {user ? (
                <div className="border-t border-border pt-2 space-y-2">
                  <Link
                    href="/profil"
                    className="flex items-center px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200 rounded-md"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="border-t border-border pt-2 space-y-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full gradient-primary text-white">Daftar</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
