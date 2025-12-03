"use client"

import { createContext, useContext, type ReactNode } from "react"
import toast, { Toaster } from "react-hot-toast"

interface ToastContextType {
  showSuccess: (title: string, description?: string) => void
  showError: (title: string, description?: string) => void
  showInfo: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const showSuccess = (title: string, description?: string) => {
    toast.success(
      description ? (
        <div className="flex flex-col gap-1">
          <div className="font-bold text-sm sm:text-base">{title}</div>
          <div className="text-xs sm:text-sm opacity-90">{description}</div>
        </div>
      ) : (
        <div className="font-bold text-sm sm:text-base">{title}</div>
      ),
      {
        duration: 3500,
        position: "top-center",
        style: {
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(16, 185, 129, 0.35), 0 2px 8px rgba(0, 0, 0, 0.1)",
          minWidth: "280px",
          maxWidth: "90vw",
          backdropFilter: "blur(10px)",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#10b981",
        },
      }
    )
  }

  const showError = (title: string, description?: string) => {
    toast.error(
      description ? (
        <div className="flex flex-col gap-1">
          <div className="font-bold text-sm sm:text-base">{title}</div>
          <div className="text-xs sm:text-sm opacity-90">{description}</div>
        </div>
      ) : (
        <div className="font-bold text-sm sm:text-base">{title}</div>
      ),
      {
        duration: 3500,
        position: "top-center",
        style: {
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(239, 68, 68, 0.35), 0 2px 8px rgba(0, 0, 0, 0.1)",
          minWidth: "280px",
          maxWidth: "90vw",
          backdropFilter: "blur(10px)",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ef4444",
        },
      }
    )
  }

  const showInfo = (title: string, description?: string) => {
    toast(
      description ? (
        <div className="flex flex-col gap-1">
          <div className="font-bold text-sm sm:text-base">{title}</div>
          <div className="text-xs sm:text-sm opacity-90">{description}</div>
        </div>
      ) : (
        <div className="font-bold text-sm sm:text-base">{title}</div>
      ),
      {
        duration: 3500,
        position: "top-center",
        icon: "ℹ️",
        style: {
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(59, 130, 246, 0.35), 0 2px 8px rgba(0, 0, 0, 0.1)",
          minWidth: "280px",
          maxWidth: "90vw",
          backdropFilter: "blur(10px)",
        },
      }
    )
  }

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerClassName=""
        containerStyle={{
          top: "clamp(60px, 10vh, 80px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 99999,
        }}
        toastOptions={{
          className: "",
          duration: 3500,
          style: {
            maxWidth: "90vw",
            fontSize: "clamp(12px, 2vw, 14px)",
            animation: "toast-enter 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards",
          },
          success: {
            duration: 3500,
            style: {
              animation: "toast-enter 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards",
            },
          },
          error: {
            duration: 3500,
            style: {
              animation: "toast-enter 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards",
            },
          },
        }}
      />
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
