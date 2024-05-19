import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import React, { FC } from "react"

import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import prisma from "../../../../prisma/client"
import dynamic from "next/dynamic"

const MarkdownPreview = dynamic(() => import("@/app/components/MarkdownPreview"), { ssr: false })

interface IssueDetailsPageType {
  params: { id: string }
}

const IssueDetailsPage: FC<IssueDetailsPageType> = async ({ params }) => {
  if (isNaN(Number(params.id))) {
    notFound()
  }

  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  })

  if (!issue) {
    notFound()
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2" align="center">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <MarkdownPreview text={issue.description} />
      </Card>
    </div>
  )
}

export default IssueDetailsPage
