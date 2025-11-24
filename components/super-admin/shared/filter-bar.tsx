import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"

interface FilterBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter?: string
  onStatusFilterChange?: (value: string) => void
  categoryFilter?: string
  onCategoryFilterChange?: (value: string) => void
  onAddClick?: () => void
  addButtonText?: string
  showCategoryFilter?: boolean
  customFilters?: React.ReactNode
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  onAddClick,
  addButtonText = "Tambah",
  showCategoryFilter = false,
  customFilters,
}: FilterBarProps) {
  return (
    <Card className="mb-8 border-border bg-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-background border-border text-foreground"
              />
            </div>
          </div>

          {onStatusFilterChange && statusFilter !== undefined && (
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="w-full md:w-48 bg-background border-border text-foreground">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="closed">Tutup</SelectItem>
              </SelectContent>
            </Select>
          )}

          {showCategoryFilter && onCategoryFilterChange && categoryFilter !== undefined && (
            <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
              <SelectTrigger className="w-full md:w-48 bg-background border-border text-foreground">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="reguler">Reguler</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="vvip">VVIP</SelectItem>
              </SelectContent>
            </Select>
          )}

          {customFilters}

          {onAddClick && (
            <Button onClick={onAddClick} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              {addButtonText}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
