import { RiErrorWarningFill } from "react-icons/ri"
import { Issue, User } from "@prisma/client"
import React, { FC } from "react"

import AssigneeSelector from "@/app/issues/[id]/_components/AssigneeSelector"
import prisma from "@/prisma/client"

interface AssigneeSelectType {
  issue: Issue
}

const AssigneeSelect: FC<AssigneeSelectType> = async ({ issue }) => {
  try {
    const users: User[] = await prisma.user.findMany({
      orderBy: { name: "asc" },
    })

    if (users.length <= 0) {
      return null
    }

    return <AssigneeSelector users={users} issueId={issue.id} assignedTo={issue.assignedToUserId} />
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
