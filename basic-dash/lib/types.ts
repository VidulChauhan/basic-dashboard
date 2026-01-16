export interface Tenant {
  id: string
  name: string
  slug: string
}

export type UserRole = "admin" | "agent"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  tenantId: string
}

export interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  status: "new" | "contacted" | "qualified" | "proposal" | "closed"
  tenantId: string
  createdAt: Date
}

export interface CallLog {
  id: string
  leadId: string
  leadName: string
  date: Date
  duration: number // in seconds
  outcome: "completed" | "no-answer" | "voicemail" | "scheduled"
  notes?: string
  tenantId: string
}

export interface AuthContextType {
  user: User | null
  currentTenant: Tenant | null
  tenants: Tenant[]
  switchTenant: (tenantId: string) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}
