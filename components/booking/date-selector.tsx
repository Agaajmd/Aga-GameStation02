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
    <Card>
      <CardContent className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={prevMonth} disabled={currentMonth <= today}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold capitalize">{monthName}</h3>
          </div>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            if (!date) {
              return <div key={index} className="h-10"></div>
            }

            const available = isDateAvailable(date)
            const selectedDate = isDateSelected(date)

            return (
              <Button
                key={index}
                variant={selectedDate ? "default" : "outline"}
                size="sm"
                className={`h-10 ${
                  selectedDate
                    ? "bg-primary text-white"
                    : available
                      ? "hover:bg-primary hover:text-white"
                      : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!available}
                onClick={() => available && onSelect(formatDate(date))}
              >
                {date.getDate()}
              </Button>
            )
          })}
        </div>

        {selected && (
          <div className="mt-4 p-3 bg-primary/10 rounded-2xl">
            <p className="text-sm text-primary font-medium">Tanggal dipilih: {selected}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
