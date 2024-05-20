import React, { FC } from "react"
import { Button } from "@radix-ui/themes"

interface DeleteIssueButtonType {
  id: number
}

const DeleteIssueButton: FC<DeleteIssueButtonType> = ({ id }) => {
  return <Button color="red">Delete Issue</Button>
}

export default DeleteIssueButton
