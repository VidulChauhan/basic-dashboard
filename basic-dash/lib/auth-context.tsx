"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { AuthContextType, User, Tenant } from "./types"
import { TENANTS, USERS } from "./mock-data"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(USERS[0])
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(TENANTS[0])

  const switchTenant = useCallback((tenantId: string) => {
    const tenant = TENANTS.find((t) => t.id === tenantId)
    if (tenant) {
      setCurrentTenant(tenant)
      // In a real app, also switch the user to one from that tenant
      const userInTenant = USERS.find((u) => u.tenantId === tenantId)
      if (userInTenant) {
        setUser(userInTenant)
      }
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    const foundUser = USERS.find((u) => u.email === email)
    if (foundUser) {
      setUser(foundUser)
      const tenant = TENANTS.find((t) => t.id === foundUser.tenantId)
      if (tenant) {
        setCurrentTenant(tenant)
      }
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setCurrentTenant(null)
  }, [])

  const value: AuthContextType = {
    user,
    currentTenant,
    tenants: TENANTS,
    switchTenant,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
