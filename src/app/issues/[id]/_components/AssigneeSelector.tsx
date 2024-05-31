"use client"

import { toast, Toaster } from "react-hot-toast"
import { Select } from "@radix-ui/themes"
import { User } from "@prisma/client"
import React, { FC } from "react"
import axios from "axios"

interface AssigneeSelectorType {
  users: User[]
  issueId: number
  assignedTo: string | null
}

const AssigneeSelector: FC<AssigneeSelectorType> = ({ users, issueId, assignedTo }) => {
  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issueId}`, {
        assignedToUserId: userId === "Unassigned" ? null : userId,
      })
      toast.success("Issue successfully assigned to user!")
    } catch {
      toast.error("Error while assigning user!")
    }
  }

  return (
    <>
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
      <Toaster />
    </>
  )
}

export default AssigneeSelector
