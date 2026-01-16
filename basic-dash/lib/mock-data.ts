import type { Tenant, User, Lead, CallLog } from "./types"

export const TENANTS: Tenant[] = [
  { id: "org-a", name: "Organization A", slug: "org-a" },
  { id: "org-b", name: "Organization B", slug: "org-b" },
]

export const USERS: User[] = [
  { id: "user-1", name: "Alice Johnson", email: "alice@org-a.com", role: "admin", tenantId: "org-a" },
  { id: "user-2", name: "Bob Smith", email: "bob@org-a.com", role: "agent", tenantId: "org-a" },
  { id: "user-3", name: "Carol White", email: "carol@org-b.com", role: "admin", tenantId: "org-b" },
  { id: "user-4", name: "David Brown", email: "david@org-b.com", role: "agent", tenantId: "org-b" },
]

export const LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "John Company Inc",
    phone: "+1 (555) 123-4567",
    email: "contact@johncompany.com",
    status: "new",
    tenantId: "org-a",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "lead-2",
    name: "Tech Solutions LLC",
    phone: "+1 (555) 234-5678",
    email: "info@techsolutions.com",
    status: "contacted",
    tenantId: "org-a",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "lead-3",
    name: "Global Ventures",
    phone: "+1 (555) 345-6789",
    email: "sales@globalventures.com",
    status: "qualified",
    tenantId: "org-a",
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "lead-4",
    name: "Digital Marketing Pro",
    phone: "+1 (555) 456-7890",
    status: "proposal",
    tenantId: "org-a",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "lead-5",
    name: "Enterprise Systems",
    phone: "+1 (555) 567-8901",
    status: "closed",
    tenantId: "org-a",
    createdAt: new Date("2023-12-20"),
  },
  {
    id: "lead-6",
    name: "StartUp Innovation",
    phone: "+1 (555) 678-9012",
    email: "contact@startup-innovation.com",
    status: "new",
    tenantId: "org-b",
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "lead-7",
    name: "Financial Partners Inc",
    phone: "+1 (555) 789-0123",
    status: "contacted",
    tenantId: "org-b",
    createdAt: new Date("2024-01-12"),
  },
]

export const CALL_LOGS: CallLog[] = [
  {
    id: "call-1",
    leadId: "lead-1",
    leadName: "John Company Inc",
    date: new Date("2024-01-20 10:30"),
    duration: 1200,
    outcome: "completed",
    notes: "Discussed pricing plans and features",
    tenantId: "org-a",
  },
  {
    id: "call-2",
    leadId: "lead-2",
    leadName: "Tech Solutions LLC",
    date: new Date("2024-01-19 14:15"),
    duration: 900,
    outcome: "scheduled",
    notes: "Follow-up meeting scheduled for next week",
    tenantId: "org-a",
  },
  {
    id: "call-3",
    leadId: "lead-3",
    leadName: "Global Ventures",
    date: new Date("2024-01-18 11:00"),
    duration: 1500,
    outcome: "completed",
    notes: "Proposal sent after call",
    tenantId: "org-a",
  },
  {
    id: "call-4",
    leadId: "lead-2",
    leadName: "Tech Solutions LLC",
    date: new Date("2024-01-17 09:45"),
    duration: 600,
    outcome: "no-answer",
    tenantId: "org-a",
  },
  {
    id: "call-5",
    leadId: "lead-6",
    leadName: "StartUp Innovation",
    date: new Date("2024-01-20 15:30"),
    duration: 800,
    outcome: "completed",
    notes: "Initial discovery call",
    tenantId: "org-b",
  },
]
