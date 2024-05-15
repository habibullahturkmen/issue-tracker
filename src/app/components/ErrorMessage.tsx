import React, { FC } from "react"
import { Text } from "@radix-ui/themes"

interface ErrorMessageType {
  message: string | undefined
}

const ErrorMessage: FC<ErrorMessageType> = ({ message }) => {
  if (!message) return null

  return (
    <Text color="red" as="p">
      {message}
    </Text>
  )
}

export default ErrorMessage
