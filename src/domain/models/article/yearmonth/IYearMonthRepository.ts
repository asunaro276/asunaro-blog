import type { YearMonth } from "./YearMonth";

export interface IYearMonthRepository {
  fetchYearMonths(): Promise<YearMonth[]>
}
