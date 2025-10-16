import type { IYearMonthRepository } from '/domain/interfaces/article/IYearMonthRepository'
import { YearMonth } from '/domain/models/article/yearmonth/YearMonth'

export class CompositeYearMonthRepository implements IYearMonthRepository {
  constructor(
    private readonly localRepository: IYearMonthRepository,
    private readonly newtRepository: IYearMonthRepository
  ) {}

  async fetchYearMonths(): Promise<YearMonth[]> {
    const [localYearMonths, newtYearMonths] = await Promise.all([
      this.localRepository.fetchYearMonths(),
      this.newtRepository.fetchYearMonths()
    ])

    // 年月でマージし、カウントを合算
    const yearMonthMap = new Map<string, { year: number; month: number; count: number }>()

    for (const ym of localYearMonths) {
      const key = ym.value
      yearMonthMap.set(key, {
        year: ym.year,
        month: ym.month,
        count: ym.count
      })
    }

    for (const ym of newtYearMonths) {
      const key = ym.value
      if (yearMonthMap.has(key)) {
        // 既存の年月の場合、カウントを加算
        yearMonthMap.get(key)!.count += ym.count
      } else {
        yearMonthMap.set(key, {
          year: ym.year,
          month: ym.month,
          count: ym.count
        })
      }
    }

    // 降順ソート
    return Array.from(yearMonthMap.entries())
      .map(([key, { year, month, count }]) =>
        new YearMonth(year, month, key, count)
      )
      .sort((a, b) => {
        if (a.year !== b.year) {
          return b.year - a.year
        }
        return b.month - a.month
      })
  }
}
