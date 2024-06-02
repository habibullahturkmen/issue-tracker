"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card } from "@radix-ui/themes"
import React, { FC } from "react"

interface IssueChartType {
  open: number
  inProgress: number
  closed: number
}

const IssueChart: FC<IssueChartType> = ({ open, inProgress, closed }) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ]

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60} style={{ fill: "var(--accent-9)" }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart
