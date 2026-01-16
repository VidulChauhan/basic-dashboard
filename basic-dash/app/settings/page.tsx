"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarNav } from "@/components/sidebar-nav"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"

export default function SettingsPage() {
  const { user } = useAuth()

  // Only admins can access settings
  if (user?.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex gap-6 p-6">
        <aside className="w-56 border-r border-border bg-sidebar">
          <SidebarNav />
        </aside>

        <main className="flex-1 max-w-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Settings</h2>
            <p className="text-muted-foreground">Manage your organization settings</p>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
                <CardDescription>Update your organization details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Organization Name</label>
                  <Input placeholder="Enter organization name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input placeholder="Enter contact email" type="email" />
                </div>
                <Button className="rounded-lg">Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage your team and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Alice Johnson", role: "Admin", email: "alice@org.com" },
                  { name: "Bob Smith", role: "Agent", email: "bob@org.com" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{member.role}</span>
                  </div>
                ))}
                <Button variant="outline" className="rounded-lg bg-transparent">
                  Add Team Member
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
