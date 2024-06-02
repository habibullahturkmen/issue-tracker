import { Issue, Status } from "@prisma/client"
import { Flex, Table } from "@radix-ui/themes"
import { RxArrowUp } from "react-icons/rx"
import React, { FC } from "react"
import NextLink from "next/link"

import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import IssueActions from "@/app/issues/IssueActions"
import Pagination from "@/app/components/Pagination"
import Link from "@/app/components/Link"
import prisma from "@/prisma/client"

interface IssuesPageType {
  searchParams: {
    status: Status
    orderBy: keyof Issue
    page: string
  }
}

interface columnType {
  label: string
  value: keyof Issue
  className?: string
}

// TODO: Descending Sort
const IssuesPage: FC<IssuesPageType> = async ({ searchParams }) => {
  const columns: columnType[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ]

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const where = { status }

  const orderBy = columns.map((column) => column.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined

  const page = Number(searchParams.page) || 1
  const pageSize = 10 // TODO: Add a dropdown list to select page size

  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className ? column.className : ""}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && true && <RxArrowUp className="inline" />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </Flex>
  )
}

export const dynamic = "force-dynamic"

export default IssuesPage
