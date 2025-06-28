"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Check } from "lucide-react"

interface ConsoleSelectorProps {
  category: "reguler" | "vip" | "vvip"
  selected: string | null
  onSelect: (option: string) => void
}

const consoleOptions = {
  reguler: [
    { id: "ps4-1", name: "PS4 Slim", available: true },
    { id: "ps4-2", name: "PS4 Pro", available: true },
    { id: "ps5-1", name: "PS5", available: false },
    { id: "ps5-2", name: "PS5 Digital", available: true },
  ],
  vip: [
    { id: "vip-1", name: "VIP Room 1", console: "PS5", available: true },
    { id: "vip-2", name: "VIP Room 2", console: "PS5", available: false },
    { id: "vip-3", name: "VIP Room 3", console: "PS5 Pro", available: true },
    { id: "vip-4", name: "VIP Room 4", console: "PS5", available: true },
  ],
  vvip: [
    { id: "vvip-1", name: "VVIP Suite 1", console: "PS5 Pro", available: true },
    { id: "vvip-2", name: "VVIP Suite 2", console: "PS5 Pro", available: false },
  ],
}

export function ConsoleSelector({ category, selected, onSelect }: ConsoleSelectorProps) {
  const options = consoleOptions[category]
  const isRoom = category !== "reguler"

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-contrast">{isRoom ? "Pilih Ruangan" : "Pilih Konsol"}</h3>

      {/* Mobile: 2 columns grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {options.map((option) => {
          const isSelected = selected === option.id

          return (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all duration-300 ${
                !option.available
                  ? "opacity-50 cursor-not-allowed"
                  : isSelected
                    ? "ring-2 ring-primary shadow-lg bg-primary/5 border-primary/20"
                    : "hover:shadow-md"
              }`}
              onClick={() => option.available && onSelect(option.id)}
            >
              <CardContent className="p-3 relative">
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}

                <div className="text-center">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Gamepad2 className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-medium text-contrast text-sm mb-1">{option.name}</h4>
                  {isRoom && <p className="text-xs text-muted-contrast">{option.console}</p>}
                  <Badge
                    className={`mt-1 text-xs ${
                      option.available
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}
                  >
                    {option.available ? "Tersedia" : "Tidak Tersedia"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Desktop: 4 columns grid */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-4">
        {options.map((option) => {
          const isSelected = selected === option.id

          return (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all duration-300 ${
                !option.available
                  ? "opacity-50 cursor-not-allowed"
                  : isSelected
                    ? "ring-2 ring-primary shadow-lg bg-primary/5 border-primary/20"
                    : "hover:shadow-md"
              }`}
              onClick={() => option.available && onSelect(option.id)}
            >
              <CardContent className="p-4 relative">
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Gamepad2 className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium text-contrast mb-1">{option.name}</h4>
                  {isRoom && <p className="text-sm text-muted-contrast mb-2">{option.console}</p>}
                  <Badge
                    className={
                      option.available
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }
                  >
                    {option.available ? "Tersedia" : "Tidak Tersedia"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
