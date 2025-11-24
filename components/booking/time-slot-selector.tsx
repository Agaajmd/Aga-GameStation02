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
              <div className="font-semibold text-foreground mb-2">{slot.time}</div>
              {!slot.available && (
                <Badge variant="destructive" className="text-xs">
                  Penuh
                </Badge>
              )}
              {slot.available && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                >
                  Tersedia
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Keterangan:</h4>
        <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Tersedia - Slot masih bisa dipilih</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Penuh - Slot sudah terisi</span>
          </div>
        </div>
      </div>
    </div>
  )
}
