import { Badge } from "@radix-ui/themes"
import { Status } from "@prisma/client"
import React, { FC } from "react"

const statusMap: Record<Status, { label: string; color: "red" | "violet" | "green" }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
}

interface IssueStatusType {
  status: Status
}

const IssueStatusBadge: FC<IssueStatusType> = ({ status }) => {
  return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
}

export default IssueStatusBadge
