"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { CallLog } from "@/lib/types"

const OUTCOME_COLORS: Record<string, { bg: string; text: string }> = {
  completed: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-800 dark:text-green-200" },
  "no-answer": { bg: "bg-red-100 dark:bg-red-900", text: "text-red-800 dark:text-red-200" },
  voicemail: { bg: "bg-orange-100 dark:bg-orange-900", text: "text-orange-800 dark:text-orange-200" },
  scheduled: { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-800 dark:text-blue-200" },
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

interface CallLogsTableProps {
  logs: CallLog[]
}

export function CallLogsTable({ logs }: CallLogsTableProps) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No call logs found</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lead Name</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Outcome</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => {
          const colors = OUTCOME_COLORS[log.outcome]
          return (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{log.leadName}</TableCell>
              <TableCell className="text-sm">
                {log.date.toLocaleDateString()} {log.date.toLocaleTimeString()}
              </TableCell>
              <TableCell className="text-sm">{formatDuration(log.duration)}</TableCell>
              <TableCell>
                <Badge className={`${colors.bg} ${colors.text} border-0`}>
                  {log.outcome
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{log.notes || "—"}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
