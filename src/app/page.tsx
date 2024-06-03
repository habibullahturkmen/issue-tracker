import { Flex, Grid } from "@radix-ui/themes"
import { Metadata } from "next"

import IssueSummary from "@/app/IssueSummary"
import LatestIssues from "@/app/LatestIssues"
import IssueChart from "@/app/IssueChart"
import prisma from "@/prisma/client"

export default async function Home() {
  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } })
  const inProgressIssues = await prisma.issue.count({ where: { status: "IN_PROGRESS" } })
  const closedIssues = await prisma.issue.count({ where: { status: "CLOSED" } })

  return (
    <main>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary open={openIssues} inProgress={inProgressIssues} closed={closedIssues} />
          <IssueChart open={openIssues} inProgress={inProgressIssues} closed={closedIssues} />
        </Flex>
        <LatestIssues />
      </Grid>
    </main>
  )
}

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View Projects and Issues Summary",
}
