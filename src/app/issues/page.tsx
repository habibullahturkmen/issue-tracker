import { Issue, Status } from "@prisma/client"
import { Flex } from "@radix-ui/themes"
import React, { FC } from "react"
import { Metadata } from "next"

import IssueTable, { columnNames } from "@/app/issues/IssueTable"
import IssueActions from "@/app/issues/IssueActions"
import Pagination from "@/app/components/Pagination"
import { SearchParams } from "@/app/issues/IIssues"
import prisma from "@/prisma/client"

interface IssuesPageType {
  searchParams: SearchParams
}

// TODO: Descending Sort
const IssuesPage: FC<IssuesPageType> = async ({ searchParams }) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const where = { status }

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined

  const page = Number(searchParams.page) || 1
  const pageSize = 10 // TODO: Add a dropdown list to select page size

  const issues: Issue[] = await prisma.issue.findMany({
    where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </Flex>
  )
}

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Issue Tracker - Issues",
  description: "View all project issues",
}

export default IssuesPage
