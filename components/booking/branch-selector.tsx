"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star, Check } from "lucide-react"

const branches = [
  {
    id: "jakarta-pusat",
    name: "Aga GAME Station Jakarta Pusat",
    address: "Jl. Thamrin No. 123, Jakarta Pusat",
    distance: "2.5 km",
    rating: 4.8,
    openHours: "10:00 - 23:00",
    facilities: ["20 PS Units", "VIP Rooms", "Cafe", "Parking"],
    status: "open",
    popular: true,
  },
  {
    id: "jakarta-selatan",
    name: "Aga GAME Station Jakarta Selatan",
    address: "Jl. Sudirman No. 456, Jakarta Selatan",
    distance: "5.2 km",
    rating: 4.7,
    openHours: "10:00 - 23:00",
    facilities: ["15 PS Units", "VIP Rooms", "Cafe"],
    status: "open",
    popular: false,
  },
  {
    id: "jakarta-barat",
    name: "Aga GAME Station Jakarta Barat",
    address: "Jl. Gajah Mada No. 789, Jakarta Barat",
    distance: "8.1 km",
    rating: 4.6,
    openHours: "10:00 - 22:00",
    facilities: ["12 PS Units", "Cafe", "Parking"],
    status: "open",
    popular: false,
  },
]

interface BranchSelectorProps {
  selected: string | null
  onSelect: (branchId: string) => void
}

export function BranchSelector({ selected, onSelect }: BranchSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Pilih Cabang</h3>

      <div className="space-y-3">
        {branches.map((branch) => {
          const isSelected = selected === branch.id

          return (
            <Card
              key={branch.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-md card-hover ${
                isSelected ? "ring-2 ring-primary shadow-lg bg-primary/5 border-primary/20" : "hover:shadow-md"
              }`}
              onClick={() => onSelect(branch.id)}
            >
              <CardContent className="p-4 relative">
                {branch.popular && (
                  <Badge className="absolute -top-2 left-4 bg-accent-cyan text-white text-xs">Populer</Badge>
                )}

                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className="flex flex-col space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm md:text-base">{branch.name}</h4>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{branch.address}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        branch.status === "open" ? "text-green-600 border-green-600" : "text-red-600 border-red-600"
                      }
                    >
                      {branch.status === "open" ? "Buka" : "Tutup"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{branch.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-muted-foreground">{branch.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{branch.openHours}</span>
                    </div>
                    <div className="text-muted-foreground">{branch.facilities[0]}</div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {branch.facilities.slice(1).map((facility, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
