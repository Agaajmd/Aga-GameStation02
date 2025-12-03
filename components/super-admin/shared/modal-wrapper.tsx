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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto py-8">
        <Card className={`w-full ${maxWidth} mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-border shadow-2xl rounded-3xl`}>
          <CardHeader className="border-b">
            <CardTitle className="text-card-foreground">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[70vh] overflow-y-auto py-6">
            {children}
          </CardContent>
          <div className="flex gap-2 px-6 py-4 border-t bg-muted/30">
            <Button onClick={onClose} variant="outline" className="flex-1 border-border hover:bg-muted">
              {cancelLabel}
            </Button>
            {onSubmit && (
              <Button onClick={onSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
                {submitLabel}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
