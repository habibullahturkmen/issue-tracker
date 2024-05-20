import React, { FC } from "react"
import { RxPencil2 } from "react-icons/rx"
import { Button } from "@radix-ui/themes"
import Link from "next/link"

interface EditIssueButtonType {
  id: number
}

const EditIssueButton: FC<EditIssueButtonType> = ({ id }) => {
  return (
    <Link href={`/issues/${id}/edit`}>
      <Button className="cursor-pointer w-full">
        <RxPencil2 />
        Edit Issue
      </Button>
    </Link>
  )
}

export default EditIssueButton
