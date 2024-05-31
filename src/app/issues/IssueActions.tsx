import { Button, Flex } from "@radix-ui/themes"
import Link from "next/link"
import React from "react"

import IssueStatusFilter from "@/app/issues/IssueStatusFilter"

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Link href="/issues/new">
        <Button className="mb-5 cursor-pointer">New Issue</Button>
      </Link>
    </Flex>
  )
}

export default IssueActions
