import { notFound } from "next/navigation"
import React, { FC } from "react"

import IssueForm from "@/app/issues/_components/IssueForm"
import prisma from "../../../../../prisma/client"

interface EditIssuePage {
  params: { id: string }
}

const EditIssuePage: FC<EditIssuePage> = async ({ params }) => {
  if (isNaN(Number(params.id))) {
    notFound()
  }

  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  })

  if (!issue) {
    notFound()
  }

  console.log(params)

  return <IssueForm issue={issue} />
}

export default EditIssuePage
