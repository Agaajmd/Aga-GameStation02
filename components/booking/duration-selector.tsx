"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Timer, TrendingUp } from "lucide-react"

interface DurationSelectorProps {
  selected: number | null
  onSelect: (duration: number) => void
}

const durations = [
  { hours: 1, price: 5000, popular: false },
  { hours: 2, price: 10000, popular: true },
  { hours: 3, price: 15000, popular: false },
  { hours: 4, price: 20000, popular: false },
  { hours: 5, price: 25000, popular: false },
  { hours: 6, price: 30000, popular: false },
]

export function DurationSelector({ selected, onSelect }: DurationSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Timer className="w-4 h-4" />
        <span>Berapa lama ingin bermain?</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {durations.map((duration) => (
          <Card
            key={duration.hours}
            className={`cursor-pointer transition-all duration-200 relative ${
              selected === duration.hours
                ? "ring-2 ring-primary border-primary bg-primary/5"
                : "hover:border-primary/50 bg-card border-border hover:shadow-sm"
            }`}
            onClick={() => onSelect(duration.hours)}
          >
            {duration.popular && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Populer</span>
                </div>
              </div>
            )}
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">{duration.hours}</div>
              <div className="text-sm text-muted-foreground mb-2">Jam</div>
              <div className="text-lg font-semibold text-primary">Rp {duration.price.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Rp {(duration.price / duration.hours).toLocaleString()}/jam
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">💡 Tips Hemat:</h4>
        <div className="space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
          <p>• Semakin lama bermain, semakin hemat per jamnya</p>
          <p>• Paket 2 jam adalah pilihan paling populer</p>
          <p>• Booking di hari kerja lebih murah 20%</p>
        </div>
      </div>
    </div>
  )
}
