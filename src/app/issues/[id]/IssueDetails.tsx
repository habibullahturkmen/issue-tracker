import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import { Issue } from "@prisma/client"
import dynamic from "next/dynamic"
import React, { FC } from "react"

import IssueStatusBadge from "@/app/components/IssueStatusBadge"

const MarkdownPreview = dynamic(() => import("@/app/components/MarkdownPreview"), { ssr: false })

interface IssueDetailsType {
  issue: Issue
}

const IssueDetails: FC<IssueDetailsType> = ({ issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2" align="center">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <MarkdownPreview text={issue.description} />
      </Card>
    </>
  )
}

export default IssueDetails
