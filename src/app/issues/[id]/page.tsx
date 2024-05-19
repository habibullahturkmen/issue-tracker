import { Box, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import React, { FC } from "react"

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
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton id={issue.id} />
      </Box>
    </Grid>
  )
}

export default IssueDetailsPage
