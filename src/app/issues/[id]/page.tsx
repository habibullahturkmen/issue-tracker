import { Box, Flex, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import React, { FC } from "react"

import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton"
import EditIssueButton from "@/app/issues/[id]/EditIssueButton"
import IssueDetails from "@/app/issues/[id]/IssueDetails"
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
    <Grid columns={{ initial: "1", sm: "5" }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton id={issue.id} />
          <DeleteIssueButton id={issue.id} />
        </Flex>
      </Box>
    </Grid>
  )
}

export default IssueDetailsPage
