import type { YearMonth } from "/domain/models/article/yearmonth/YearMonth";

export interface IYearMonthRepository {
  fetchYearMonths(): Promise<YearMonth[]>
}
