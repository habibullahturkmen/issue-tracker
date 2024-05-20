import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import { GoTrash } from "react-icons/go"
import React, { FC } from "react"

interface DeleteIssueButtonType {
  id: number
}

const DeleteIssueButton: FC<DeleteIssueButtonType> = ({ id }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" className="cursor-pointer w-lg">
          <GoTrash />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete this issue?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" className="cursor-pointer">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" className="cursor-pointer">
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton
