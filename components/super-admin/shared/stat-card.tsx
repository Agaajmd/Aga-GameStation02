import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  iconBgColor: string
  valueColor?: string
  delay?: string
}

export function StatCard({ title, value, icon, iconBgColor, valueColor, delay }: StatCardProps) {
  return (
    <Card className="animate-slide-up border-border bg-card" style={{ animationDelay: delay }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`text-3xl font-bold ${valueColor || "text-foreground"}`}>{value}</p>
          </div>
          <div className={`w-12 h-12 ${iconBgColor} rounded-2xl flex items-center justify-center`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
