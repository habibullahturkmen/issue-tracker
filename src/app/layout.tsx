import { Theme } from "@radix-ui/themes"
import { Inter } from "next/font/google"
import "@radix-ui/themes/styles.css"
import type { Metadata } from "next"
import React from "react"

import { Providers } from "@/app/context/providers"
import NavBar from "@/app/NavBar"
import "./theme-config.css"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Track your Issues/bugs with our Issue Tracker App.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.variable}>
        <Providers>
          <Theme accentColor="violet">
            <NavBar />
            <main className="p-5">{children}</main>
          </Theme>
        </Providers>
      </body>
    </html>
  )
}
