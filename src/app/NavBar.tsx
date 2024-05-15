"use client"

import { usePathname } from "next/navigation"
import { AiFillBug } from "react-icons/ai"
import Link from "next/link"
import { clsx } from "clsx"
import React from "react"

import ThemeSwitch from "@/app/components/ThemeSwitch"

const NavBar = () => {
  const currentPath = usePathname()
  const links = [
    { id: 0, label: "Dashboard", href: "/" },
    { id: 1, label: "Issues", href: "/issues" },
  ]

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link
        className="text-zinc-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
        href="/"
      >
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6 items-center">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              className={clsx({
                "text-zinc-900 dark:text-white": link.href === currentPath,
                "text-zinc-500 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-white":
                  link.href !== currentPath,
                "transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <ThemeSwitch />
      </ul>
    </nav>
  )
}

export default NavBar
