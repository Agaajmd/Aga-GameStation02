"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"

interface TimeSlotSelectorProps {
  selected: string | null
  onSelect: (timeSlot: string) => void
}

const timeSlots = [
  { time: "09:00", available: true, occupied: 2 },
  { time: "10:00", available: true, occupied: 1 },
  { time: "11:00", available: true, occupied: 0 },
  { time: "12:00", available: false, occupied: 4 },
  { time: "13:00", available: true, occupied: 3 },
  { time: "14:00", available: true, occupied: 1 },
  { time: "15:00", available: true, occupied: 2 },
  { time: "16:00", available: false, occupied: 4 },
  { time: "17:00", available: true, occupied: 1 },
  { time: "18:00", available: true, occupied: 3 },
  { time: "19:00", available: true, occupied: 2 },
  { time: "20:00", available: true, occupied: 1 },
  { time: "21:00", available: false, occupied: 4 },
  { time: "22:00", available: true, occupied: 2 },
  { time: "23:00", available: true, occupied: 1 },
]

export function TimeSlotSelector({ selected, onSelect }: TimeSlotSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>Pilih jam mulai bermain</span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {timeSlots.map((slot) => (
          <Card
            key={slot.time}
            className={`cursor-pointer transition-all duration-200 ${
              !slot.available
                ? "opacity-50 cursor-not-allowed bg-muted border-muted"
                : selected === slot.time
                  ? "ring-2 ring-primary border-primary bg-primary/5"
                  : "hover:border-primary/50 bg-card border-border hover:shadow-sm"
            }`}
            onClick={() => slot.available && onSelect(slot.time)}
          >
            <CardContent className="p-3 text-center">
              <div className="font-semibold text-foreground mb-1">{slot.time}</div>
              <div className="flex items-center justify-center space-x-1">
                <Users className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{slot.occupied}/4</span>
              </div>
              {!slot.available && (
                <Badge variant="destructive" className="text-xs mt-1">
                  Penuh
                </Badge>
              )}
              {slot.available && slot.occupied === 0 && (
                <Badge
                  variant="secondary"
                  className="text-xs mt-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                >
                  Kosong
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Keterangan:</h4>
        <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Tersedia - Masih ada slot kosong</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Penuh - Semua slot terisi</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-3 h-3" />
            <span>Angka menunjukkan jumlah pemain yang sedang bermain</span>
          </div>
        </div>
      </div>
    </div>
  )
}
