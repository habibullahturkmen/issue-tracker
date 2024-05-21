"use client"

import { Avatar, Box, Container, DropdownMenu, Flex, Skeleton, Text } from "@radix-ui/themes"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { AiFillBug } from "react-icons/ai"
import Link from "next/link"
import { clsx } from "clsx"
import React from "react"

import ThemeSwitch from "@/app/components/ThemeSwitch"

const NavBar = () => {
  return (
    <nav className="flex justify-center items-center border-b mb-5 px-5 h-16">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link
              className="text-zinc-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              href="/"
            >
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname()

  const links = [
    { id: 0, label: "Dashboard", href: "/" },
    { id: 1, label: "Issues", href: "/issues" },
  ]

  return (
    <ul className="flex space-x-6 items-center">
      {links.map((link) => (
        <li key={link.id}>
          <Link
            className={clsx({
              "nav-link": link.href !== currentPath,
              "nav-link-current-path": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
      <ThemeSwitch />
    </ul>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()

  if (status === "loading") return <Skeleton width="40px" height="40px" className="rounded-3xl" />

  if (status === "unauthenticated") {
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    )
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            variant="solid"
            color="purple"
            radius="full"
            src={session?.user?.image as string}
            fallback={session?.user?.name?.at(0) as string}
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft" color="indigo">
          <DropdownMenu.Label>
            <Text size="2">{session?.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default NavBar
