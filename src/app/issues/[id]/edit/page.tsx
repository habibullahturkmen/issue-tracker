import { notFound } from "next/navigation"
import React, { FC } from "react"

import IssueFormClient from "@/app/issues/_components/IssueFormClient"
import prisma from "@/prisma/client"

interface EditIssuePage {
  params: { id: string }
}

const EditIssuePage: FC<EditIssuePage> = async ({ params }) => {
  if (isNaN(Number(params.id))) {
    notFound()
  }

  const issue = await prisma.issue
    .findUnique({
      where: { id: Number(params.id) },
    })
    .catch((e) => console.error(e))

  if (!issue) {
    notFound()
  }

  return <IssueFormClient issue={issue} />
}

export default EditIssuePage
