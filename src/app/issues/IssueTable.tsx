import { RxArrowUp } from "react-icons/rx"
import { Table } from "@radix-ui/themes"
import { Issue } from "@prisma/client"
import React, { FC } from "react"
import NextLink from "next/link"

import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import { ColumnType, SearchParams } from "@/app/issues/IIssues"
import Link from "@/app/components/Link"

interface IssueTableType {
  issues: Issue[]
  searchParams: SearchParams
}

const IssueTable: FC<IssueTableType> = ({ issues, searchParams }) => {
  return (
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
  )
}

const columns: ColumnType[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
]

export const columnNames = columns.map((column) => column.value)

export default IssueTable
