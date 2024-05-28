import { Box, Flex, Grid } from "@radix-ui/themes"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import React, { FC } from "react"

import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton"
import EditIssueButton from "@/app/issues/[id]/EditIssueButton"
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect"
import IssueDetails from "@/app/issues/[id]/IssueDetails"
import authOptions from "@/app/api/auth/authOptions"
import prisma from "../../../../prisma/client"

interface IssueDetailsPageType {
  params: { id: string }
}

const IssueDetailsPage: FC<IssueDetailsPageType> = async ({ params }) => {
  const session = await getServerSession(authOptions)

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
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect />
            <EditIssueButton id={issue.id} />
            <DeleteIssueButton id={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  )
}

export default IssueDetailsPage
