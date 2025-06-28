import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">Aga Game</span>
            </div>
            <p className="text-gray-400">
              Tempat gaming PlayStation terbaik dengan fasilitas lengkap dan harga terjangkau.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Menu Utama</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors">
                Beranda
              </Link>
              <Link href="/booking" className="block text-gray-400 hover:text-white transition-colors">
                Booking
              </Link>
              <Link href="/promo" className="block text-gray-400 hover:text-white transition-colors">
                Promo
              </Link>
              <Link href="/riwayat" className="block text-gray-400 hover:text-white transition-colors">
                Riwayat
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-cyan" />
                <span className="text-gray-400">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-cyan" />
                <span className="text-gray-400">info@agagame.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-cyan mt-1" />
                <span className="text-gray-400">
                  Jl. Gaming Center No. 123
                  <br />
                  Jakarta Selatan, 12345
                </span>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Jam Operasional</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-accent-mint" />
                <div className="text-gray-400">
                  <div>Senin - Jumat: 10:00 - 23:00</div>
                  <div>Sabtu - Minggu: 09:00 - 24:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Aga Game. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
