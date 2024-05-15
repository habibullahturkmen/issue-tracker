"use client"

import { Button, Callout, Skeleton, TextField } from "@radix-ui/themes"
import { useForm, Controller } from "react-hook-form"
import React, { useEffect, useState } from "react"
import { AiFillInfoCircle } from "react-icons/ai"
import { MdEditor, Themes } from "md-editor-rt"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import "md-editor-rt/lib/style.css"
import axios from "axios"

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const [isClient, setIsClient] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const { register, control, handleSubmit } = useForm<IssueForm>()
  const { resolvedTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data)
      router.push("/issues")
    } catch (e) {
      setError("an unexpected error occurred")
    }
  }

  return (
    <div className="max-w-2xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <AiFillInfoCircle />
          </Callout.Icon>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        {isClient ? (
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
        ) : (
          <Skeleton className="rounded-md" height={"500px"} />
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
