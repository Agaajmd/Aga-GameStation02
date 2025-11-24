// Types for Branch Management
export interface Branch {
  id: string
  name: string
  address: string
  phone: string
  email: string
  manager: string
  status: "active" | "maintenance" | "closed"
  totalUnits: number
  activeUnits: number
  maintenanceUnits: number
  regularUnits: number
  vipUnits: number
  vvipUnits: number
  monthlyRevenue?: number
  totalCustomers?: number
  rating?: number
  openDate?: string
  description?: string
  openingHours?: string
}

export interface BranchFormData {
  name: string
  address: string
  phone: string
  email: string
  manager: string
  regularUnits: number
  vipUnits: number
  vvipUnits: number
  description?: string
  openingHours?: string
}

// Types for PS Units Management
export interface PSUnit {
  id: string
  name: string
  type: "PS4" | "PS5" | "PS5 Pro"
  category: "reguler" | "vip" | "vvip"
  location: string
  status: "available" | "occupied" | "maintenance" | "offline"
  condition: "excellent" | "good" | "fair" | "needs_repair"
  lastMaintenance: string
  totalHours: number
  price: number
  specifications: {
    storage: string
    controllers: number
    accessories: string[]
  }
}

export interface PSUnitFormData {
  name: string
  type: "PS4" | "PS5" | "PS5 Pro"
  category: "reguler" | "vip" | "vvip"
  location: string
  condition: "excellent" | "good" | "fair" | "needs_repair"
  price: number
  specifications: {
    storage: string
    controllers: number
    accessories: string[]
  }
}

// Common status types
export type Status = "active" | "maintenance" | "closed" | "available" | "occupied" | "offline"
