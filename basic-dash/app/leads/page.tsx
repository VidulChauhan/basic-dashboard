"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarNav } from "@/components/sidebar-nav"
import { LeadsTable } from "@/components/leads-table"
import { useAuth } from "@/lib/auth-context"
import { LEADS } from "@/lib/mock-data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search } from "lucide-react"

export default function LeadsPage() {
  const { user, currentTenant } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const tenantLeads = LEADS.filter((l) => l.tenantId === currentTenant?.id)

  const filtered = tenantLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || lead.phone.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex gap-6 p-6">
        <aside className="w-56 border-r border-border bg-sidebar">
          <SidebarNav />
        </aside>

        <main className="flex-1 max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Leads</h2>
            <p className="text-muted-foreground">Manage and track all your sales leads</p>
          </div>

          <Card className="bg-card border-border mb-6">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 flex gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search leads..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {user?.role === "admin" && (
                  <Button className="gap-2 rounded-lg">
                    <Plus className="h-4 w-4" />
                    Add Lead
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={filtered} isAdmin={user?.role === "admin"} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
