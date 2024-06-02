import { Issue, Status } from "@prisma/client"
import { RxArrowUp } from "react-icons/rx"
import { Table } from "@radix-ui/themes"
import React, { FC } from "react"
import NextLink from "next/link"

import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import IssueActions from "@/app/issues/IssueActions"
import Link from "@/app/components/Link"
import prisma from "@/prisma/client"

interface IssuesPageType {
  searchParams: { status: Status; orderBy: keyof Issue }
}

interface columnType {
  label: string
  value: keyof Issue
  className?: string
}

const IssuesPage: FC<IssuesPageType> = async ({ searchParams }) => {
  const columns: columnType[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ]

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  const orderBy = columns.map((column) => column.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined

  const issues = await prisma.issue.findMany({ where: { status: status }, orderBy: orderBy })

  return (
    <div>
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
    </div>
  )
}

export const dynamic = "force-dynamic"

export default IssuesPage
