"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"

interface ToastContextType {
  showSuccess: (title: string, description?: string) => void
  showError: (title: string, description?: string) => void
  showInfo: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<any[]>([])

  const showToast = (type: "success" | "error" | "info", title: string, description?: string) => {
    const id = Date.now().toString()
    const toast = { id, type, title, description }
    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }

  const showSuccess = (title: string, description?: string) => {
    showToast("success", title, description)
  }

  const showError = (title: string, description?: string) => {
    showToast("error", title, description)
  }

  const showInfo = (title: string, description?: string) => {
    showToast("info", title, description)
  }

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
