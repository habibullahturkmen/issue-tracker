import { RiErrorWarningFill } from "react-icons/ri"
import { Select } from "@radix-ui/themes"
import { User } from "@prisma/client"
import React from "react"

import prisma from "@/prisma/client"

const AssigneeSelect = async () => {
  try {
    const users: User[] = await prisma.user.findMany({
      orderBy: { name: "asc" },
    })

    if (users.length <= 0) {
      return null
    }

    return (
      <Select.Root>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users.map((user: User) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    )
  } catch (e) {
    console.log(e)
    return (
      <div className="flex items-center justify-center gap-2 text-red-500 h-5">
        <p className="text-xs text-center pb-0">Error while fetching users</p>
        <RiErrorWarningFill size={14} />
      </div>
    )
  }
}

export default AssigneeSelect
