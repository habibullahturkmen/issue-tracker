"use client"

import { useRouter, useSearchParams } from "next/navigation"
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
  const searchParams = useSearchParams()

  const filterIssues = (status: string) => {
    const params = new URLSearchParams()
    if (status) {
      params.append("status", status)
    }
    if (searchParams.get("orderBy")) {
      params.append("orderBy", searchParams.get("orderBy")!)
    }
    const query = params.size ? "?" + params.toString() : ""
    router.push(`/issues/${query}`)
  }

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "ALL"}
      onValueChange={(status) => filterIssues(status)}
    >
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
