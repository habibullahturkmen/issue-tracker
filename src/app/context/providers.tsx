"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import React from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
