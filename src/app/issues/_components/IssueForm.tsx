"use client"

import { Button, Callout, Spinner, TextField } from "@radix-ui/themes"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AiFillInfoCircle } from "react-icons/ai"
import { MdEditor, Themes } from "md-editor-rt"
import React, { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Issue } from "@prisma/client"
import "md-editor-rt/lib/style.css"
import axios from "axios"
import { z } from "zod"

import ErrorMessage from "@/app/components/ErrorMessage"
import { issueSchema } from "@/app/validationSchemas"

type IssueFormData = z.infer<typeof issueSchema>

interface IssueFormType {
  issue?: Issue
}

const IssueForm: FC<IssueFormType> = ({ issue }) => {
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  })
  const { resolvedTheme } = useTheme()
  const router = useRouter()

  const onSubmit = handleSubmit(async (data: IssueFormData) => {
    try {
      setIsLoading(true)
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data)
      } else {
        await axios.post("/api/issues", data)
      }
      router.push("/issues")
      router.refresh()
    } catch (e) {
      setError("an unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <div className="max-w-2xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <AiFillInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register("title")} />
        <ErrorMessage message={errors.title?.message} />
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => {
            return (
              <MdEditor
                className="rounded-md"
                {...field}
                theme={resolvedTheme as Themes}
                language="en-US"
                modelValue={field.value}
                placeholder="Add a description..."
              />
            )
          }}
        />
        <ErrorMessage message={errors.description?.message} />
        <Button className="cursor-pointer" disabled={isLoading}>
          {issue ? "Update Issue" : "Submit New Issue"}
          {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
