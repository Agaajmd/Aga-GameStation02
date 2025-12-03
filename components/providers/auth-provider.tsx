"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import toast from "react-hot-toast"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "admin" | "super-admin"
  phone?: string
  avatar?: string
  branch?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User }>
  logout: () => void
  register: (userData: any) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for testing
const demoUsers = [
  {
    id: "1",
    name: "John Customer",
    email: "customer@demo.com",
    password: "customer123",
    role: "customer" as const,
    phone: "+62 812 3456 7890",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@demo.com",
    password: "admin123",
    role: "admin" as const,
    phone: "+62 812 3456 7891",
    branch: "Jakarta Pusat",
  },
  {
    id: "3",
    name: "Super Admin",
    email: "superadmin@demo.com",
    password: "superadmin123",
    role: "super-admin" as const,
    phone: "+62 812 3456 7892",
    branch: "Pusat",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session only on client side
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          localStorage.removeItem("user")
        }
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; user?: User }> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = demoUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      }
      setIsLoading(false)
      return { success: true, user: userWithoutPassword }
    }

    setIsLoading(false)
    return { success: false }
  }

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: "customer",
      phone: userData.phone,
    }

    setUser(newUser)
    if (typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(newUser))
    }
    setIsLoading(false)
    return true
  }

  const logout = () => {
    const userName = user?.name || "Pengguna"
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user")
      localStorage.removeItem("cart")
    }
    toast(
      <div className="flex flex-col gap-1">
        <div className="font-bold text-base">Logout Berhasil</div>
        <div className="text-sm opacity-90">Sampai jumpa lagi, {userName}!</div>
      </div>,
      {
        duration: 3000,
        position: "top-center",
        icon: "👋",
        style: {
          background: "#3b82f6",
          color: "#fff",
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(59, 130, 246, 0.3)",
          minWidth: "300px",
          maxWidth: "500px",
        },
      }
    )
  }

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
