import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">Aga GAME</span>
                <span className="text-sm text-gray-400">Station</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Tempat gaming PlayStation terbaik dengan fasilitas lengkap dan harga terjangkau untuk semua kalangan.
            </p>
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center hover:bg-blue-600/40 transition-all duration-300 cursor-pointer group">
                <span className="text-blue-400 text-lg group-hover:scale-110 transition-transform duration-300">📱</span>
              </div>
              <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center hover:bg-purple-600/40 transition-all duration-300 cursor-pointer group">
                <span className="text-purple-400 text-lg group-hover:scale-110 transition-transform duration-300">🎮</span>
              </div>
              <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center hover:bg-green-600/40 transition-all duration-300 cursor-pointer group">
                <span className="text-green-400 text-lg group-hover:scale-110 transition-transform duration-300">💬</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white relative pb-3">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h3>
            <div className="space-y-3">
              {[
                { href: "/", label: "Beranda" },
                { href: "/booking", label: "Booking" },
                { href: "/announcement", label: "Pengumuman" },
                { href: "/riwayat", label: "Riwayat" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-2 transform hover:bg-white/5 py-2 px-3 rounded-lg -mx-3"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white relative pb-3">
              Kontak
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group hover:bg-white/5 p-3 rounded-lg -mx-3 transition-all duration-300">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/40 transition-all duration-300">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-gray-300 text-sm">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3 group hover:bg-white/5 p-3 rounded-lg -mx-3 transition-all duration-300">
                <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center group-hover:bg-purple-600/40 transition-all duration-300">
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-gray-300 text-sm">info@agagame.com</span>
              </div>
              <div className="flex items-start space-x-3 group hover:bg-white/5 p-3 rounded-lg -mx-3 transition-all duration-300">
                <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center group-hover:bg-green-600/40 transition-all duration-300 mt-0.5">
                  <MapPin className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-gray-300 text-sm leading-relaxed">
                  Jl. Gaming Center No. 123<br />
                  Jakarta Selatan, 12345
                </span>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white relative pb-3">
              Jam Operasional
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group hover:bg-white/5 p-3 rounded-lg -mx-3 transition-all duration-300">
                <div className="w-10 h-10 bg-orange-600/20 rounded-xl flex items-center justify-center group-hover:bg-orange-600/40 transition-all duration-300 mt-0.5">
                  <Clock className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-gray-300 text-sm space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span>Senin - Jumat:</span>
                    <span className="text-white font-medium">10:00 - 23:00</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span>Sabtu - Minggu:</span>
                    <span className="text-white font-medium">09:00 - 24:00</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs font-medium">Buka Sekarang</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; 2024 Aga Game Station. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                Terms of Service
              </Link>
              <Link href="/support" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
