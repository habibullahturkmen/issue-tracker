import LatestIssues from "@/app/LatestIssues"
import IssueSummary from "@/app/IssueSummary"
import prisma from "@/prisma/client"
import IssueChart from "@/app/IssueChart"

export default async function Home() {
  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } })
  const inProgressIssues = await prisma.issue.count({ where: { status: "IN_PROGRESS" } })
  const closedIssues = await prisma.issue.count({ where: { status: "CLOSED" } })

  return (
    <main>
      <LatestIssues />
      <IssueSummary open={openIssues} inProgress={inProgressIssues} closed={closedIssues} />
      <IssueChart open={openIssues} inProgress={inProgressIssues} closed={closedIssues} />
    </main>
  )
}

export const dynamic = "force-dynamic"
