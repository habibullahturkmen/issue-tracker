import { Link as RadixLink } from "@radix-ui/themes"
import NextLink from "next/link"
import React, { FC } from "react"

interface LinkType {
  href: string
  children: string
}

const Link: FC<LinkType> = ({ href, children }) => {
  return (
    <NextLink href={href} passHref={true} legacyBehavior={true}>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

export default Link
