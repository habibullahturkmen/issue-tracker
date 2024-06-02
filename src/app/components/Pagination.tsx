import React, { FC } from "react"
import { Button, Flex, Text } from "@radix-ui/themes"
import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx"

interface PaginationType {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Pagination: FC<PaginationType> = ({ itemCount, pageSize, currentPage }) => {
  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) {
    return null
  }

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button color="grass" variant="soft" disabled={currentPage === 1}>
        <RxDoubleArrowLeft />
      </Button>
      <Button color="grass" variant="soft" disabled={currentPage === 1}>
        <RxChevronLeft />
      </Button>
      <Button color="grass" variant="soft" disabled={currentPage === pageCount}>
        <RxChevronRight />
      </Button>
      <Button color="grass" variant="soft" disabled={currentPage === pageCount}>
        <RxDoubleArrowRight />
      </Button>
    </Flex>
  )
}

export default Pagination
