import { describe, expect, test } from "bun:test"
import { YearMonth } from "./YearMonth"

describe('YearMonth', () => {
  describe('正常系', () => {
    test('有効な値を引数にするとvalueにハイフンつなぎの値をもつ', () => {
      expect(new YearMonth(2023, 10).value).toBe("2023-10")
      expect(new YearMonth(2024, 3).value).toBe("2024-3")
    })

    test('nextで次の月を取れる', () => {
      expect(new YearMonth(2024, 3).next).toBe("2024-4")
      expect(new YearMonth(2024, 12).next).toBe("2025-1")
    })

    test('yearで年を取れる', () => {
      expect(new YearMonth(2024, 12).year).toBe(2024)
    })

    test('monthで月を取れる', () => {
      expect(new YearMonth(2024, 12).month).toBe(12)
    })


    test('同一のyearとmonthを持つYearMonthは同一とみなす', () => {
      const yearmonth1 = new YearMonth(2023, 2)
      const yearmonth2 = new YearMonth(2023, 2)
      const yearmonth3 = new YearMonth(2024, 4)
      expect(yearmonth1.equals(yearmonth2)).toBeTruthy()
      expect(yearmonth1.equals(yearmonth3)).toBeFalsy()
    })
  })

  describe('異常系', () => {
    test('不正な値を引数にするとエラーを投げる', () => {
      expect(() => new YearMonth(2020, 11)).toThrow(`year(2020)は有効範囲（${YearMonth.startYear} ~ ${YearMonth.thisYear}）の外です`)
      expect(() => new YearMonth(2020.5, 11)).toThrow(`yearが整数ではありません`)
    })
  })
})
