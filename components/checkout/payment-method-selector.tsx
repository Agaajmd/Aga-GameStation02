"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Banknote, Check } from "lucide-react"

interface PaymentMethodSelectorProps {
  selected: string
  onSelect: (method: string) => void
}

export function PaymentMethodSelector({ selected, onSelect }: PaymentMethodSelectorProps) {
  const paymentMethods = [
    {
      id: "cash",
      name: "Bayar di Kasir",
      description: "Bayar langsung di kasir saat datang",
      icon: Banknote,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
      popular: true,
    },
    {
      id: "transfer",
      name: "Transfer Bank",
      description: "Transfer ke rekening bank",
      icon: CreditCard,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      popular: false,
    },
    {
      id: "ewallet",
      name: "E-Wallet",
      description: "OVO, GoPay, DANA, ShopeePay",
      icon: Smartphone,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      popular: false,
    },
  ]

  return (
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
                  <div className={`p-2 rounded-lg ${method.bgColor}`}>
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
  )
}
