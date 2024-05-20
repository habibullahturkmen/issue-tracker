import { NextRequest, NextResponse } from "next/server"

import { issueSchema } from "@/app/validationSchemas"
import prisma from "../../../../../prisma/client"

interface ParamType {
  params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: ParamType) {
  const body = await request.json()
  const validation = issueSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  if (isNaN(Number(params.id))) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 })
  }

  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  })

  if (!issue) {
    return NextResponse.json({ error: "Issue Not Found" }, { status: 404 })
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  })

  return NextResponse.json(updatedIssue, { status: 200 })
}

export async function DELETE(request: NextRequest, { params }: ParamType) {
  if (isNaN(Number(params.id))) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
  }

  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  })

  if (!issue) {
    return NextResponse.json({ error: "Issue Not Found" }, { status: 404 })
  }

  const deletedIssue = await prisma.issue.delete({
    where: { id: Number(params.id) },
  })

  return NextResponse.json(deletedIssue, { status: 200 })

}
