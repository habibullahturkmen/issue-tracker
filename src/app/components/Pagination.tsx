"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button, Flex, Text } from "@radix-ui/themes"
import React, { FC } from "react"
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
  const router = useRouter()
  const searchParams = useSearchParams()

  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) {
    return null
  }

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    router.push("?" + params.toString())
  }

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="grass"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <RxDoubleArrowLeft />
      </Button>
      <Button
        color="grass"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <RxChevronLeft />
      </Button>
      <Button
        color="grass"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <RxChevronRight />
      </Button>
      <Button
        color="grass"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <RxDoubleArrowRight />
      </Button>
    </Flex>
  )
}

export default Pagination
