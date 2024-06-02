import { Issue, Status } from "@prisma/client"

export interface SearchParams {
  status: Status
  orderBy: keyof Issue
  page: string
}

export interface ColumnType {
  label: string
  value: keyof Issue
  className?: string
}
