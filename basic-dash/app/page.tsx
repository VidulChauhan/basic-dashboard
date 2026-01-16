"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarNav } from "@/components/sidebar-nav"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Phone, CheckCircle } from "lucide-react"

export default function Dashboard() {
  const { user, currentTenant } = useAuth()

  const stats = [
    { label: "Total Leads", value: "24", icon: Users, color: "bg-blue-500" },
    { label: "Calls Today", value: "8", icon: Phone, color: "bg-green-500" },
    { label: "Closed Deals", value: "5", icon: CheckCircle, color: "bg-purple-500" },
    { label: "Conversion Rate", value: "24%", icon: TrendingUp, color: "bg-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex gap-6 p-6">
        <aside className="w-56 border-r border-border bg-sidebar">
          <SidebarNav />
        </aside>

        <main className="flex-1 max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(" ")[0]}</h2>
            <p className="text-muted-foreground">
              You're viewing data for <span className="font-medium text-foreground">{currentTenant?.name}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <Card key={i} className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <div className={`${stat.color} p-2 rounded-lg`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Last 7 days activity overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New lead added", time: "2 hours ago", status: "new" },
                    { action: "Call completed", time: "4 hours ago", status: "completed" },
                    { action: "Proposal sent", time: "1 day ago", status: "proposal" },
                    { action: "Deal closed", time: "2 days ago", status: "closed" },
                  ].map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "New Leads This Month", value: "12" },
                    { label: "Average Call Duration", value: "15min 30s" },
                    { label: "Follow-up Rate", value: "87%" },
                    { label: "Team Members", value: "4" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
