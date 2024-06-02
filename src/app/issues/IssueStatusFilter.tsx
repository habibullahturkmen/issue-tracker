"use client"

import { useRouter } from "next/navigation"
import { Select } from "@radix-ui/themes"
import { Status } from "@prisma/client"
import React from "react"

interface statusesType {
  label: string
  value?: Status
}

const statuses: statusesType[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
]

const IssueStatusFilter = () => {
  const router = useRouter()

  const filterIssues = (status: string) => {
    const query = status && status !== "ALL" ? `?status=${status}` : ""
    router.push(`/issues/${query}`)
  }

  return (
    <Select.Root onValueChange={(status) => filterIssues(status)}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
