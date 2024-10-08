import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import React, { FC } from "react"

import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton"
import prisma from "@/prisma/client"

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})

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

  return <IssueForm issue={issue} />
}

export default EditIssuePage
