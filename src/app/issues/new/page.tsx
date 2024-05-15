"use client"

import { Button, Callout, Skeleton, Spinner, TextField } from "@radix-ui/themes"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useState } from "react"
import { AiFillInfoCircle } from "react-icons/ai"
import { MdEditor, Themes } from "md-editor-rt"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import "md-editor-rt/lib/style.css"
import axios from "axios"
import { z } from "zod"

import { createIssueSchema } from "@/app/validationSchemas"
import ErrorMessage from "@/app/components/ErrorMessage"

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const [isClient, setIsClient] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  })
  const { resolvedTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onSubmit = async (data: IssueForm) => {
    try {
      setIsLoading(true)
      await axios.post("/api/issues", data)
      router.push("/issues")
    } catch (e) {
      setError("an unexpected error occurred")
    } finally {
      reset()
      setIsLoading(false)
    }
  }

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
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage message={errors.title?.message} />
        {isClient ? (
          <>
            <Controller
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
              name="description"
              control={control}
            />
            <ErrorMessage message={errors.description?.message} />
          </>
        ) : (
          <Skeleton className="rounded-md" height={"500px"} />
        )}
        <Button className="cursor-pointer" disabled={isLoading}>
          Submit New Issue {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage
