"use client"

import { Button, Skeleton, TextField } from "@radix-ui/themes"
import { useForm, Controller } from "react-hook-form"
import React, { useEffect, useState } from "react"
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
  const [isClient, setIsClient] = useState(false)

  const { register, control, handleSubmit } = useForm<IssueForm>()
  const { resolvedTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <form
      className="max-w-2xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data)
        router.push("/issues")
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
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
                  modelValue={field.value ? field.value : "Add a description..."}
                />
              )
            }}
            name="description"
            control={control}
          />
        </>
      ) : (
        <Skeleton className="rounded-md" height={"500px"} />
      )}
      <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage
