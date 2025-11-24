// Utility functions for Super Admin components

// Status color helper
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "active":
    case "available":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    case "occupied":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
    case "closed":
    case "offline":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
  }
}

// Category color helper
export const getCategoryColor = (category: string): string => {
  switch (category) {
    case "reguler":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    case "vip":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
    case "vvip":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
  }
}

// Currency formatter
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

// Status label helper
export const getStatusLabel = (status: string): string => {
  switch (status) {
    case "active":
    case "available":
      return status === "active" ? "Aktif" : "Tersedia"
    case "occupied":
      return "Digunakan"
    case "maintenance":
      return "Maintenance"
    case "closed":
      return "Tutup"
    case "offline":
      return "Offline"
    default:
      return status
  }
}

// Condition label helper
export const getConditionLabel = (condition: string): string => {
  switch (condition) {
    case "excellent":
      return "Sangat Baik"
    case "good":
      return "Baik"
    case "fair":
      return "Cukup"
    case "needs_repair":
      return "Perlu Perbaikan"
    default:
      return condition
  }
}

// Generate unit ID
export const generateUnitId = (type: string, count: number): string => {
  return `${type}${String(count + 1).padStart(3, "0")}`
}

// Generate branch ID
export const generateBranchId = (count: number): string => {
  return `BR${String(count + 1).padStart(3, "0")}`
}
