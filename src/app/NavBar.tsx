import { AiFillBug } from "react-icons/ai"
import Link from "next/link"
import React from "react"
import ThemeSwitch from "@/app/components/ThemeSwitch"

const NavBar = () => {
  const links = [
    { id: 0, label: "Dashboard", href: "/" },
    { id: 1, label: "Issues", href: "/issues" },
  ]

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link className="text-zinc-700 hover:text-black dark:text-gray-300 dark:hover:text-white" href="/"><AiFillBug /></Link>
      <ul className="flex space-x-6 items-center">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              className="text-zinc-500 hover:text-zinc-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              href={link.href}>
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
