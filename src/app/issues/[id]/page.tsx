import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import React, { FC } from "react"

import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import prisma from "../../../../prisma/client"

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
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  )
}

export default IssueDetailsPage
