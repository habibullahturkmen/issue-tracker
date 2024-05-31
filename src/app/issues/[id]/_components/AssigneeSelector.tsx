"use client"

import { RiErrorWarningFill } from "react-icons/ri"
import React, { FC, useState } from "react"
import { Select } from "@radix-ui/themes"
import { User } from "@prisma/client"
import axios from "axios"

interface AssigneeSelectorType {
  users: User[]
  issueId: number
  assignedTo: string | null
}

const AssigneeSelector: FC<AssigneeSelectorType> = ({ users, issueId, assignedTo }) => {
  const [hasError, setHasError] = useState<boolean>(false)

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issueId}`, {
        assignedToUserId: userId === "Unassigned" ? null : userId,
      })
    } catch (e) {
      setHasError(true)
    }
  }

  return (
    <>
      {hasError && (
        <div className="flex items-center justify-center gap-2 text-red-500 h-5">
          <p className="text-xs text-center pb-0">Error while assigning user</p>
          <RiErrorWarningFill size={14} />
        </div>
      )}
      <Select.Root
        defaultValue={assignedTo ? assignedTo : "Unassigned"}
        onValueChange={(userId) => assignIssue(userId)}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="Unassigned">Unassigned</Select.Item>
            {users.map((user: User) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  )
}

export default AssigneeSelector
