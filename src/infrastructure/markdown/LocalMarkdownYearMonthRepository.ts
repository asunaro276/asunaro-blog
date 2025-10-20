import { getCollection } from 'astro:content'
import type { IYearMonthRepository } from '/domain/interfaces/article/IYearMonthRepository'
import { YearMonth } from '/domain/models/article/yearmonth/YearMonth'

export class LocalMarkdownYearMonthRepository implements IYearMonthRepository {
  async fetchYearMonths(): Promise<YearMonth[]> {
    const entries = await getCollection('posts')

    // 各年月の記事数を集計
    const yearMonthMap = new Map<string, { year: number; month: number; count: number }>()

    for (const entry of entries) {
      const date = new Date(entry.data.publishedAt)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 // getMonth() は 0始まりなので +1
      const key = `${year}-${month}`

      if (yearMonthMap.has(key)) {
        yearMonthMap.get(key)!.count++
      } else {
        yearMonthMap.set(key, { year, month, count: 1 })
      }
    }

    // YearMonth オブジェクトに変換して降順ソート
    const yearMonths = Array.from(yearMonthMap.entries())
      .map(([key, { year, month, count }]) => {
        const yearMonth = new YearMonth(year, month, key, count)
        return yearMonth
      })
      .sort((a, b) => {
        // 年でソート、次に月でソート（降順）
        if (a.year !== b.year) {
          return b.year - a.year
        }
        return b.month - a.month
      })

    return yearMonths
  }
}
