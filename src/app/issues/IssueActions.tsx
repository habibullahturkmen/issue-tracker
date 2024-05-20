import { Button } from "@radix-ui/themes"
import Link from "next/link"
import React from "react"

const IssueActions = () => {
  return (
    <Link href="/issues/new">
      <Button className="mb-5 cursor-pointer">New Issue</Button>
    </Link>
  )
}

export default IssueActions
