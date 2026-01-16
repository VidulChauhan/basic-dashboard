"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import { Users, Phone, Settings, LayoutDashboard } from "lucide-react"

const items = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "agent"] },
  { href: "/leads", label: "Leads", icon: Users, roles: ["admin", "agent"] },
  { href: "/calls", label: "Call Logs", icon: Phone, roles: ["admin", "agent"] },
  { href: "/settings", label: "Settings", icon: Settings, roles: ["admin"] },
]

export function SidebarNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  const visibleItems = items.filter((item) => item.roles.includes(user?.role || "agent"))

  return (
    <nav className="flex flex-col gap-2 px-3 py-4">
      {visibleItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
