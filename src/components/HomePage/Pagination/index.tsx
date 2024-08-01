import * as React from 'react'
import MuiPagination from '@mui/material/Pagination'
import MuiPaginationItem from '@mui/material/PaginationItem'
import { ARTICLE_NUM_PER_PAGE } from '/constants'

type Props = {
  dir: string
  pageNumber: number
  totalCount: number
}

const Pagination = ({ dir, pageNumber, totalCount }: Props) => {
  const totalPages = Math.ceil(totalCount / ARTICLE_NUM_PER_PAGE)
  return (
    <MuiPagination
      page={pageNumber}
      count={totalPages}
      renderItem={(item) => {
        const to = (() => {
          if (Number(item.page) < 1) {
            return '/'
          }
          if (Number(item.page) > totalPages) {
            return `/`
          }
          if (dir === '') {
            return item.page === 1 ? `/` : `/${item.page}`
          } else {
            return item.page === 1 ? `/${dir}` : `/${dir}/${item.page}`
          }
        })()
        return (
          <MuiPaginationItem
            {...item}
            component={'a'}
            href={to}
            disabled={pageNumber === item.page ? true : item.disabled}
          />
        )
      }}
    />
  )
}

export default Pagination
