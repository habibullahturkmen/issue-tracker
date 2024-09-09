import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { issueSchema } from "@/app/validationSchemas"
import authOptions from "@/app/api/auth/authOptions"
import prisma from "@/prisma/client"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized: cannot CREATE issue!" }, { status: 401 })
    }

    const body = await request.json()
    const validation = issueSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const newIssue = await prisma.issue.create({
      data: { title: body.title, description: body.description },
    })

    return NextResponse.json(newIssue, { status: 201 })
  } catch (e) {
    console.error(e)
  }
}
