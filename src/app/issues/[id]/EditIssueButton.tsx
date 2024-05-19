import React, { FC } from "react"
import { RxPencil2 } from "react-icons/rx"
import { Button } from "@radix-ui/themes"
import Link from "next/link"

interface EditIssueButtonType {
  id: number
}

const EditIssueButton: FC<EditIssueButtonType> = ({ id }) => {
  return (
    <Button className="cursor-pointer">
      <RxPencil2 />
      <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
    </Button>
  )
}

export default EditIssueButton
