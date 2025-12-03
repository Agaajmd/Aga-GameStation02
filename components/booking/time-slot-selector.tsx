"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface TimeSlotSelectorProps {
  selected: string | null
  onSelect: (timeSlot: string) => void
}

const timeSlots = [
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:00", available: true },
  { time: "12:00", available: false },
  { time: "13:00", available: true },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: false },
  { time: "17:00", available: true },
  { time: "18:00", available: true },
  { time: "19:00", available: true },
  { time: "20:00", available: true },
  { time: "21:00", available: false },
  { time: "22:00", available: true },
  { time: "23:00", available: true },
]

export function TimeSlotSelector({ selected, onSelect }: TimeSlotSelectorProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground bg-muted/30 px-4 py-3 rounded-lg">
        <Clock className="w-5 h-5 text-primary" />
        <span>Pilih jam mulai bermain</span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
        {timeSlots.map((slot) => (
          <Card
            key={slot.time}
            className={`cursor-pointer transition-all duration-300 overflow-hidden ${
              !slot.available
                ? "opacity-40 cursor-not-allowed bg-muted/50 border-muted"
                : selected === slot.time
                  ? "ring-2 ring-primary border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg scale-105"
                  : "hover:border-primary/50 bg-card border-border hover:shadow-md hover:scale-105 active:scale-95"
            }`}
            onClick={() => slot.available && onSelect(slot.time)}
          >
            <CardContent className="p-3 sm:p-4 text-center space-y-2">
              <div className={`text-base sm:text-lg font-bold ${
                selected === slot.time ? 'text-primary' : 'text-foreground'
              }`}>{slot.time}</div>
              {!slot.available && (
                <Badge variant="destructive" className="text-[10px] sm:text-xs px-2 py-0.5">
                  Penuh
                </Badge>
              )}
              {slot.available && (
                <Badge
                  variant="secondary"
                  className="text-[10px] sm:text-xs px-2 py-0.5 bg-gradient-to-r from-green-100 to-green-50 text-green-700 dark:from-green-900/30 dark:to-green-900/20 dark:text-green-300 border border-green-200 dark:border-green-800"
                >
                  Tersedia
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50/80 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 p-4 sm:p-5 rounded-xl border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm">
        <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Keterangan
        </h4>
        <div className="space-y-2.5 text-sm text-blue-800 dark:text-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-sm"></div>
            <span className="font-medium">Tersedia - Slot masih bisa dipilih</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-sm"></div>
            <span className="font-medium">Penuh - Slot sudah terisi</span>
          </div>
        </div>
      </div>
    </div>
  )
}
