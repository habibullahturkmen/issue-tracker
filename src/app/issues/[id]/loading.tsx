import { Box, Card, Flex, Skeleton } from "@radix-ui/themes"
import React from "react"

const LoadingIssueDetailsPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="2" align="center">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailsPage
