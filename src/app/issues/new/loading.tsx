import { Box, Skeleton } from "@radix-ui/themes"
import React from "react"

const LoadingNewIssuePage = () => {
  return (
    <Box>
      <Skeleton className="mb-2" height="30px" />
      <Skeleton className="rounded-md" height="500px" />
    </Box>
  )
}

export default LoadingNewIssuePage
