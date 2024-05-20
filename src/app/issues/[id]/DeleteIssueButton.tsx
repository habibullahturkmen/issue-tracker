"use client"

import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import React, { FC, useState } from "react"
import { GoTrash } from "react-icons/go"
import axios from "axios"

interface DeleteIssueButtonType {
  id: number
}

const DeleteIssueButton: FC<DeleteIssueButtonType> = ({ id }) => {
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const deleteIssue = async () => {
    setIsLoading(true)
    try {
      await axios.delete(`/api/issues/${id}`)
      router.push("/issues")
      router.refresh()
    } catch (err: any) {
      setError(err.response.data.error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 5000)
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            color="red"
            className="cursor-pointer w-lg"
            disabled={isLoading}
          >
            <GoTrash />
            Delete Issue
            {isLoading && <Spinner />}
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
              <Button
                variant="solid"
                color="red"
                className="cursor-pointer"
                onClick={() => deleteIssue()}
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={!!error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description size="2">
            This issue could not be deleted because: {error}
          </AlertDialog.Description>
          <Button
            variant="soft"
            color="gray"
            className="cursor-pointer mt-3"
            onClick={() => setError("")}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
