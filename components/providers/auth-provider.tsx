"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "admin" | "super-admin"
  phone?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
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
  },
  {
    id: "3",
    name: "Super Admin",
    email: "superadmin@demo.com",
    password: "superadmin123",
    role: "super-admin" as const,
    phone: "+62 812 3456 7892",
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

  const login = async (email: string, password: string): Promise<boolean> => {
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
      return true
    }

    setIsLoading(false)
    return false
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
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user")
    }
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
