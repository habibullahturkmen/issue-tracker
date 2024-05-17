"use client"

import { MdPreview, MdCatalog, Themes } from "md-editor-rt"
import React, { useState } from "react"
import { useTheme } from "next-themes"
import "md-editor-rt/lib/preview.css"

const scrollElement = document.documentElement

// @ts-ignore
const MarkdownPreview = ({ text }) => {
  const [id] = useState("preview-only")

  const { resolvedTheme } = useTheme()

  return (
    <>
      <MdPreview theme={resolvedTheme as Themes} editorId={id} modelValue={text} />
      <MdCatalog editorId={id} scrollElement={scrollElement} />
    </>
  )
}

export default MarkdownPreview
