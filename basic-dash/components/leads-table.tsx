"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Lead } from "@/lib/types"
import { useState } from "react"

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  new: { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-800 dark:text-blue-200" },
  contacted: { bg: "bg-yellow-100 dark:bg-yellow-900", text: "text-yellow-800 dark:text-yellow-200" },
  qualified: { bg: "bg-purple-100 dark:bg-purple-900", text: "text-purple-800 dark:text-purple-200" },
  proposal: { bg: "bg-indigo-100 dark:bg-indigo-900", text: "text-indigo-800 dark:text-indigo-200" },
  closed: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-800 dark:text-green-200" },
}

interface LeadsTableProps {
  leads: Lead[]
  isAdmin: boolean
  onStatusChange?: (leadId: string, newStatus: Lead["status"]) => void
}

export function LeadsTable({ leads, isAdmin, onStatusChange }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<string | null>(null)

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No leads found</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          {isAdmin && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => {
          const colors = STATUS_COLORS[lead.status]
          return (
            <TableRow key={lead.id} hover:className="bg-muted/50">
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{lead.email || "—"}</TableCell>
              <TableCell>
                <Badge className={`${colors.bg} ${colors.text} border-0`}>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{lead.createdAt.toLocaleDateString()}</TableCell>
              {isAdmin && (
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedLead(selectedLead === lead.id ? null : lead.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
