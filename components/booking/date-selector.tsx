"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

interface DateSelectorProps {
  selected: string
  onSelect: (date: string) => void
}

export function DateSelector({ selected, onSelect }: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  const maxDate = new Date()
  maxDate.setDate(today.getDate() + 30) // Allow booking up to 30 days ahead

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const isDateAvailable = (date: Date) => {
    return date >= today && date <= maxDate
  }

  const isDateSelected = (date: Date) => {
    return selected === formatDate(date)
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const days = getDaysInMonth(currentMonth)
  const monthName = currentMonth.toLocaleDateString("id-ID", { month: "long", year: "numeric" })

  return (
    <Card className="shadow-lg border-border/40">
      <CardContent className="p-4 sm:p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={prevMonth} 
            disabled={currentMonth <= today}
            className="h-9 w-9 p-0 rounded-full hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-lg">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-base sm:text-lg font-bold capitalize text-foreground">{monthName}</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={nextMonth}
            className="h-9 w-9 p-0 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3">
          {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
            <div key={day} className="text-center text-xs sm:text-sm font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days.map((date, index) => {
            if (!date) {
              return <div key={index} className="h-10 sm:h-11"></div>
            }

            const available = isDateAvailable(date)
            const selectedDate = isDateSelected(date)
            const isToday = date.toDateString() === today.toDateString()

            return (
              <Button
                key={index}
                variant={selectedDate ? "default" : "outline"}
                size="sm"
                className={`h-10 sm:h-11 min-w-[40px] sm:min-w-[44px] p-0 text-sm font-semibold transition-all duration-200 ${
                  selectedDate
                    ? "bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg scale-105 ring-2 ring-primary/30"
                    : available
                      ? `hover:bg-primary hover:text-white hover:scale-105 ${isToday ? 'border-primary border-2 text-primary' : ''}`
                      : "opacity-40 cursor-not-allowed bg-muted/50"
                }`}
                disabled={!available}
                onClick={() => available && onSelect(formatDate(date))}
              >
                <span className="relative">
                  {date.getDate()}
                  {isToday && !selectedDate && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                  )}
                </span>
              </Button>
            )
          })}
        </div>

        {selected && (
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <p className="text-sm font-bold text-primary">Tanggal dipilih: {selected}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
