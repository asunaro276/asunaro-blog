import { newtClient } from '../client'
import type { YearMonthItem } from '/types'

export const fetchYearMonth = async (): Promise<YearMonthItem[]> => {
  const yearmonths = (
    await newtClient.getContents<YearMonthItem>({
      appUid: 'asunaroblog',
      modelUid: 'yearmonth',
      query: {
        limit: 100,
        depth: 1,
        order: ['_sys.customOrder']
      },
    })
  ).items.reverse()
  return yearmonths
}
