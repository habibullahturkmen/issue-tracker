"use client"

import { AiFillMoon, AiFillSun } from "react-icons/ai"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div style={{ height: "16px", width: "16px" }}></div>

  if (resolvedTheme === "dark") {
    return (
      <AiFillSun
        className="text-gray-300 hover:text-white cursor-pointer"
        onClick={() => setTheme("light")}
        size={16}
      />
    )
  }

  if (resolvedTheme === "light") {
    return (
      <AiFillMoon
        className="text-zinc-500 hover:text-zinc-900 cursor-pointer"
        onClick={() => setTheme("dark")}
        size={16}
      />
    )
  }
}
