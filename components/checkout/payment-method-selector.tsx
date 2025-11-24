"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, QrCode, Wallet, DollarSign, Copy, Check } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/providers/toast-provider"
import { FileUpload } from "./file-upload"

interface PaymentMethodSelectorProps {
  selected: string
  onSelect: (method: string) => void
  transferProof?: File | null
  onTransferProofSelect?: (file: File | null) => void
}

const paymentMethods = [
  {
    id: "ewallet-dana",
    name: "DANA",
    type: "ewallet",
    icon: Wallet,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    description: "Transfer melalui aplikasi DANA",
    account: "081234567890",
    accountName: "Aga Game Station",
    popular: true,
  },
  {
    id: "ewallet-gopay",
    name: "GoPay",
    type: "ewallet",
    icon: Wallet,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    description: "Transfer melalui aplikasi GoPay",
    account: "081234567890",
    accountName: "Aga Game Station",
    popular: true,
  },
  {
    id: "ewallet-ovo",
    name: "OVO",
    type: "ewallet",
    icon: Wallet,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    description: "Transfer melalui aplikasi OVO",
    account: "081234567890",
    accountName: "Aga Game Station",
  },
  {
    id: "bank-bca",
    name: "Transfer BCA",
    type: "bank",
    icon: Building2,
    color: "text-blue-700",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    description: "Transfer ke rekening BCA",
    account: "1234567890",
    accountName: "Aga Game Station",
  },
  {
    id: "bank-mandiri",
    name: "Transfer Mandiri",
    type: "bank",
    icon: Building2,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    description: "Transfer ke rekening Mandiri",
    account: "1234567890",
    accountName: "Aga Game Station",
  },
  {
    id: "bank-bri",
    name: "Transfer BRI",
    type: "bank",
    icon: Building2,
    color: "text-blue-800",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    description: "Transfer ke rekening BRI",
    account: "1234567890",
    accountName: "Aga Game Station",
  },
  {
    id: "qris",
    name: "QRIS",
    type: "qris",
    icon: QrCode,
    color: "text-red-600",
    bgColor: "bg-red-100 dark:bg-red-900/20",
    description: "Bayar dengan scan QR Code",
    account: "Scan QR Code",
    accountName: "Aga Game Station",
    popular: true,
  },
  {
    id: "cash-counter",
    name: "Bayar di Kasir",
    type: "cash",
    icon: DollarSign,
    color: "text-gray-600",
    bgColor: "bg-gray-100 dark:bg-gray-900/20",
    description: "Bayar langsung di lokasi",
    account: "Kode akan diberikan",
    accountName: "Datang ke kasir",
  },
]

export function PaymentMethodSelector({ 
  selected, 
  onSelect, 
  transferProof, 
  onTransferProofSelect 
}: PaymentMethodSelectorProps) {
  const { showSuccess } = useToast()
  const [copiedAccount, setCopiedAccount] = useState<string>("")

  const copyToClipboard = async (text: string, methodId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAccount(methodId)
      showSuccess("Berhasil disalin!", "Nomor rekening/akun telah disalin ke clipboard")
      setTimeout(() => setCopiedAccount(""), 2000)
    } catch (err) {
      showSuccess("Nomor disalin", text)
    }
  }

  const selectedMethod = paymentMethods.find((method) => method.id === selected)

  return (
    <div className="space-y-4">
    <div className="space-y-3">
      {paymentMethods.map((method) => {
        const IconComponent = method.icon
        const isSelected = selected === method.id

        return (
          <Card
            key={method.id}
            className={`cursor-pointer transition-all duration-200 ${
              isSelected
                ? "ring-2 ring-primary border-primary bg-primary/5"
                : "hover:border-primary/50 bg-card border-border hover:shadow-sm"
            }`}
            onClick={() => onSelect(method.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-2xl ${method.bgColor}`}>
                    <IconComponent className={`w-5 h-5 ${method.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-foreground">{method.name}</h3>
                      {method.popular && (
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                          Populer
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
      </div>

      {/* Payment Details */}
      {selectedMethod && selectedMethod.type !== "cash" && (
        <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
          <CardContent className="p-4">
            <h4 className="font-semibold text-foreground mb-3">Detail Pembayaran</h4>

            {selectedMethod.type === "qris" ? (
              <div className="text-center space-y-4">
                <div className="w-48 h-48 mx-auto bg-white rounded-2xl p-4 border">
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Scan QR Code di atas untuk melakukan pembayaran</p>
                
                {/* File Upload Section for QRIS */}
                {onTransferProofSelect && (
                  <div className="space-y-3 text-left">
                    <h5 className="font-medium text-foreground">Upload Bukti Pembayaran</h5>
                    <FileUpload 
                      file={transferProof || null} 
                      onFileSelect={onTransferProofSelect} 
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-background rounded-2xl border">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {selectedMethod.type === "ewallet" ? "Nomor E-Wallet" : "Nomor Rekening"}
                    </p>
                    <p className="font-mono text-lg font-semibold text-foreground">{selectedMethod.account}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(selectedMethod.account, selectedMethod.id)}
                    className="border-primary/20 hover:bg-primary/10"
                  >
                    {copiedAccount === selectedMethod.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 bg-background rounded-2xl border">
                  <div>
                    <p className="text-sm text-muted-foreground">Atas Nama</p>
                    <p className="font-semibold text-foreground">{selectedMethod.accountName}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(selectedMethod.accountName, `${selectedMethod.id}-name`)}
                    className="border-primary/20 hover:bg-primary/10"
                  >
                    {copiedAccount === `${selectedMethod.id}-name` ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-2xl border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Penting:</strong> Pastikan nominal transfer sesuai dengan total pembayaran dan simpan bukti
                    transfer untuk diupload.
                  </p>
                </div>

                {/* File Upload Section */}
                {onTransferProofSelect && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-foreground">Upload Bukti Transfer</h5>
                    <FileUpload 
                      file={transferProof || null} 
                      onFileSelect={onTransferProofSelect} 
                    />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {selectedMethod && selectedMethod.type === "cash" && (
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <h4 className="font-semibold text-foreground mb-3">Pembayaran di Kasir</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Kode pembayaran akan diberikan setelah konfirmasi booking</p>
              <p>• Tunjukkan kode ke kasir dalam waktu yang ditentukan</p>
              <p>• Lokasi: Jl. Gaming Center No. 123, Jakarta Selatan</p>
              <p>• Jam operasional: 09:00 - 24:00</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
