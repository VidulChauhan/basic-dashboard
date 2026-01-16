"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarNav } from "@/components/sidebar-nav"
import { CallLogsTable } from "@/components/call-logs-table"
import { useAuth } from "@/lib/auth-context"
import { CALL_LOGS } from "@/lib/mock-data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BadgePlus as PhonePlus } from "lucide-react"
import { useState } from "react"

export default function CallLogsPage() {
  const { currentTenant, user } = useAuth()
  const [outcomeFilter, setOutcomeFilter] = useState<string>("all")

  const tenantLogs = CALL_LOGS.filter((l) => l.tenantId === currentTenant?.id)

  const filtered = outcomeFilter === "all" ? tenantLogs : tenantLogs.filter((log) => log.outcome === outcomeFilter)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex gap-6 p-6">
        <aside className="w-56 border-r border-border bg-sidebar">
          <SidebarNav />
        </aside>

        <main className="flex-1 max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Call Logs</h2>
            <p className="text-muted-foreground">Track and review all call interactions</p>
          </div>

          <Card className="bg-card border-border mb-6">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-4">
                <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Outcomes</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="no-answer">No Answer</SelectItem>
                    <SelectItem value="voicemail">Voicemail</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                {user?.role === "admin" && (
                  <Button className="gap-2 rounded-lg">
                    <PhonePlus className="h-4 w-4" />
                    Log Call
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CallLogsTable logs={filtered} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
