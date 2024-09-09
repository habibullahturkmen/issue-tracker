import { Card, Flex, Text } from "@radix-ui/themes"
import { Status } from "@prisma/client"
import React, { FC } from "react"
import Link from "next/link"

interface IssueSummaryType {
  open: number
  inProgress: number
  closed: number
}

const IssueSummary: FC<IssueSummaryType> = ({ open, inProgress, closed }) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ]

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link className="text-sm font-medium" href={`/issues/?status=${container.status}`}>
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary
