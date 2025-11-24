import { Navbar } from "@/components/layout/navbar"
import { QRScanner } from "@/components/admin/qr-scanner"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ScanPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <section className="py-8 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8 animate-fade-in">
                <h1 className="text-3xl font-bold text-foreground mb-2">QR Scanner</h1>
                <p className="text-muted-foreground">Scan QR code untuk check-in dan check-out pelanggan</p>
              </div>
              <QRScanner />
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  )
}
