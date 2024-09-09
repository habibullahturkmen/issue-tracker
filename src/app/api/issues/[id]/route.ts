import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { patchIssueSchema } from "@/app/validationSchemas"
import authOptions from "@/app/api/auth/authOptions"
import prisma from "@/prisma/client"

interface ParamType {
  params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: ParamType) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized: cannot EDIT issue!" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, assignedToUserId } = body
    const validation = patchIssueSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 })
    }

    if (isNaN(Number(params.id))) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 })
    }

    if (assignedToUserId) {
      const user = await prisma.user.findUnique({ where: { id: assignedToUserId } })
      if (!user) {
        return NextResponse.json({ error: "User Not Found" }, { status: 400 })
      }
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
        title,
        description,
        assignedToUserId,
      },
    })

    return NextResponse.json(updatedIssue, { status: 200 })
  } catch (e) {
    console.error(e)
  }
}

export async function DELETE(request: NextRequest, { params }: ParamType) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized: cannot DELETE issue!" }, { status: 401 })
    }

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
  } catch (e) {
    console.error(e)
  }
}
