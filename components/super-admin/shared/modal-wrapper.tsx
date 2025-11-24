import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ModalWrapperProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  onSubmit?: () => void
  submitLabel?: string
  cancelLabel?: string
  maxWidth?: string
}

export function ModalWrapper({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = "Simpan",
  cancelLabel = "Batal",
  maxWidth = "max-w-4xl",
}: ModalWrapperProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className={`w-full ${maxWidth} max-h-[90vh] overflow-y-auto bg-card border-border`}>
        <CardHeader>
          <CardTitle className="text-card-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
          <div className="flex space-x-2">
            <Button onClick={onClose} variant="outline" className="flex-1 border-border hover:bg-muted">
              {cancelLabel}
            </Button>
            {onSubmit && (
              <Button onClick={onSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
                {submitLabel}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
