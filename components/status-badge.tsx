import { Badge } from "@/components/ui/badge"
import type { BlogStatus } from "@/lib/mdx"

interface StatusBadgeProps {
  status: BlogStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
    case "pending":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
    case "rejected":
      return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
    default:
      return null
  }
}
