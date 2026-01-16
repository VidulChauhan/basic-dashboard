"use client"

import { useAuth } from "@/lib/auth-context"
import { TenantSwitcher } from "./tenant-switcher"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { LogOut, Settings } from "lucide-react"

export function DashboardHeader() {
  const { user, currentTenant, logout } = useAuth()

  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-6 flex-1">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-foreground">SalesHub</h1>
            <p className="text-xs text-muted-foreground">Sales Dashboard</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <TenantSwitcher />
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right mr-4">
            <p className="text-sm font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
          {user?.role === "admin" && (
            <Button variant="ghost" size="icon" className="rounded-lg">
              <Settings className="h-4 w-4" />
            </Button>
          )}
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-lg" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
