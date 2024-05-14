"use client"

import { MdEditor, Themes } from "md-editor-rt"
import React, { useState } from "react"
import { useTheme } from "next-themes"
import "md-editor-rt/lib/style.css"

const MarkdownEditor = () => {
  const { resolvedTheme } = useTheme()

  const [text, setText] = useState("Add a description...")
  return (
    <MdEditor
      theme={resolvedTheme as Themes}
      language="en-US"
      modelValue={text}
      onChange={setText}
    />
  )
}

export default MarkdownEditor
